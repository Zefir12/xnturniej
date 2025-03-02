import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { getUserGamesFromCurrentMonth, getUserMemberStats } from '@/services/chessService'
import { PlayerAccounts } from '@/common/consts'
import type { ChessGame, ChessStats, HistoryData, Rapid, Tactics } from '@/models/models'

export const useMainStore = defineStore('main', () => {
    const players = ref<ChessStats[]>([])
    const playerGames = ref<{ username: string; games: ChessGame[] }[]>([])
    const playerHistoryData = ref<{ username: string; data: HistoryData }[]>([])
    const playerEloGainsAndGames = ref<{ username: string; eloGains: number; gamesPlayedToday: number }[]>([])

    const getStats = async () => {
        const playerDataList = <ChessStats[]>[]

        const promises = Object.values(PlayerAccounts).map((name) => {
            return getUserMemberStats(name).then((data) => {
                return {
                    rating: (data.stats.find((x) => x.key === 'rapid') as unknown as Rapid).stats.rating,
                    username: name,
                    tacticsRating: (data.stats.find((x) => x.key === 'tactics') as unknown as Tactics)?.stats.rating,
                    playedMatches: (data.stats.find((x) => x.key === 'rapid') as unknown as Rapid).stats
                        .total_game_count,
                    tacticsDone: (data.stats.find((x) => x.key === 'tactics') as unknown as Tactics)?.stats
                        .attempt_count,
                } as ChessStats
            })
        })

        const results = await Promise.all(promises)
        playerDataList.push(...results)
        players.value = [...playerDataList]
    }

    const getRatingFromGame = (playername: string, game: ChessGame): number => {
        if (game.white.username.toLowerCase() == playername.toLowerCase()) {
            return game.white.rating
        } else {
            return game.black.rating
        }
    }

    const getEloGainsTodayForPlayer = () => {
        const today = new Date()
        today.setHours(0, 1, 0, 0) // Set hours to 0, minutes to 1, seconds to 0, milliseconds to 0
        const unixTimestamp = Math.floor(today.getTime() / 1000)
        //check if played any games today otherwise 0
        for (const player of Object.values(PlayerAccounts)) {
            const games = playerGames.value
                .find((x) => x.username === player)
                ?.games.filter((x) => x.time_class == 'rapid')

            if (games && games.length > 0) {
                //get last elo before today
                let lastelo = 0
                const beforegames = games.filter((x) => x.end_time < unixTimestamp)
                if (beforegames.length > 0) {
                    const lastGameBeforeTimestamp = beforegames.reduce((lastGame, currentGame) => {
                        if (!lastGame || currentGame.end_time > lastGame.end_time) {
                            return currentGame
                        }
                        return lastGame
                    }, games[0])
                    lastelo = getRatingFromGame(player, lastGameBeforeTimestamp)
                } else {
                    lastelo = playerHistoryData.value.find((x) => x.username === player)?.data.stats.elo ?? 0
                }

                const lastGameToday = games.reduce((lastGame, currentGame) => {
                    if (
                        currentGame.end_time >= unixTimestamp && // Ensure the game ends on or after today (not before)
                        (!lastGame || currentGame.end_time > lastGame.end_time)
                    ) {
                        return currentGame
                    }
                    return lastGame
                }, games[0])

                playerEloGainsAndGames.value.push({
                    username: player,
                    eloGains: getRatingFromGame(player, lastGameToday) - lastelo,
                    gamesPlayedToday: games.filter((x) => x.end_time >= unixTimestamp).length,
                })
            }
        }
    }

    const getAllPlayerGames = async () => {
        const pgames = <{ username: string; games: ChessGame[] }[]>[]
        const promises = Object.values(PlayerAccounts).map((name) => {
            return getUserGamesFromCurrentMonth(name).then((data) => {
                return { username: name, games: data.games } as { username: string; games: ChessGame[] }
            })
        })
        const results = await Promise.all(promises)
        pgames.push(...results)
        playerGames.value = [...pgames]
    }

    const getAllHistoryData = async () => {
        const p = <{ username: string; data: HistoryData }[]>[]
        const promises = Object.values(PlayerAccounts).map((playerName) => {
            return import(`../assets/${playerName}.json`).then((module) => {
                return { data: module.default as HistoryData, username: playerName }
            })
        })
        const jsonDatas = await Promise.all(promises)
        p.push(...jsonDatas)
        playerHistoryData.value = [...p]
    }

    onMounted(async () => {
        await getStats()
        await getAllPlayerGames()
        await getAllHistoryData()
        getEloGainsTodayForPlayer()
    })
    return { getStats, players, playerGames, playerHistoryData, playerEloGainsAndGames }
})
