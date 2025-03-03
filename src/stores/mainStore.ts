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

    const mostEloToday = ref({ player: '', elo: 0 })
    const mostGamesToday = ref({ player: '', games: 0 })
    const mostRecentGameBetweenPlayers = ref<{ game: ChessGame | undefined; date: number }>({
        game: undefined,
        date: 0,
    })

    const getStats = async () => {
        const playerDataList = <ChessStats[]>[]

        const promises = Object.values(PlayerAccounts).map((name) => {
            return getUserMemberStats(name).then((data) => {
                return {
                    rating: (data.stats.find((x) => x.key === 'rapid') as unknown as Rapid).stats.rating,
                    username: name,
                    tacticsRating: (data.stats.find((x) => x.key === 'tactics') as unknown as Tactics)?.stats.rating,
                    playedMatches: (data.stats.find((x) => x.key === 'rapid') as unknown as Rapid).stats
                        .total_game_count, //its rapids
                    tacticsDone: (data.stats.find((x) => x.key === 'tactics') as unknown as Tactics)?.stats
                        .attempt_count,
                    timeSpentOnTatics: (data.stats.find((x) => x.key === 'tactics') as unknown as Tactics)?.stats
                        .total_seconds,
                } as ChessStats
            })
        })

        const results = await Promise.all(promises)
        playerDataList.push(...results)
        players.value = [...playerDataList]
    }

    const getStats2 = async () => {
        const playerDataList = <ChessStats[]>[]
        const data = await import(`../assets/data.json`)

        const promises = Object.values(PlayerAccounts).map((name) => {
            return {
                rating: (data[name].stats.find((x) => x.key === 'rapid') as unknown as Rapid)?.stats.rating,
                username: name,
                tacticsRating: (data[name].stats.find((x) => x.key === 'tactics') as unknown as Tactics)?.stats.rating,
                playedMatches: (data[name].stats.find((x) => x.key === 'rapid') as unknown as Rapid)?.stats
                    .total_game_count,
                tacticsDone: (data[name].stats.find((x) => x.key === 'tactics') as unknown as Tactics)?.stats
                    .attempt_count,
                timeSpentOnTatics: (data[name].stats.find((x) => x.key === 'tactics') as unknown as Tactics)?.stats
                    .total_seconds,
            } as ChessStats
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
                const gamesTodayCount = games.filter((x) => x.end_time >= unixTimestamp).length
                if (gamesTodayCount > 0) {
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
                    if (mostEloToday.value.elo <= getRatingFromGame(player, lastGameToday) - lastelo) {
                        mostEloToday.value.elo = getRatingFromGame(player, lastGameToday) - lastelo
                        mostEloToday.value.player = player
                    }
                    if (mostGamesToday.value.games <= gamesTodayCount) {
                        mostGamesToday.value.games = gamesTodayCount
                        mostGamesToday.value.player = player
                    }
                    playerEloGainsAndGames.value.push({
                        username: player,
                        eloGains: getRatingFromGame(player, lastGameToday) - lastelo,
                        gamesPlayedToday: games.filter((x) => x.end_time >= unixTimestamp).length,
                    })
                }
            }
        }
    }

    const findMostRecentGameBetweenPlayers = () => {
        const validUsernames = Object.values(PlayerAccounts).map((u) => u.toLowerCase())
        for (const player of Object.values(PlayerAccounts)) {
            const games = playerGames.value
                .find((x) => x.username.toLowerCase() == player.toLowerCase())
                ?.games.filter(
                    (game) =>
                        validUsernames.includes(game.white.username.toLowerCase()) &&
                        validUsernames.includes(game.black.username.toLowerCase()),
                )
            if (games) {
                const sortedGames = games.sort((a, b) => b.end_time - a.end_time)
                if (sortedGames.length > 0) {
                    if (sortedGames[0].end_time > mostRecentGameBetweenPlayers.value.date) {
                        mostRecentGameBetweenPlayers.value.game = sortedGames[0]
                        mostRecentGameBetweenPlayers.value.date = sortedGames[0].end_time
                    }
                }
            }
        }
    }

    const getStalmatedGames = () => {
        for (const player of Object.values(PlayerAccounts)) {
            const games = playerGames.value
                .find((x) => x.username.toLowerCase() == player.toLowerCase())
                ?.games.filter(
                    (x) =>
                        (x.white.result == 'stalemate' && x.white.username.toLowerCase() == player.toLowerCase()) ||
                        (x.black.result == 'stalemate' && x.black.username.toLowerCase() == player.toLowerCase()),
                )
            if (games) {
                const aplayer = players.value.find((x) => x.username.toLowerCase() == player.toLowerCase())
                if (aplayer) {
                    aplayer.stalemateGamesPercent =
                        Math.round(
                            ((games.length +
                                (playerHistoryData.value.find((x) => x.username == player)?.data.stats.stalemate ??
                                    0)) /
                                (players.value.find((x) => x.username.toLowerCase() == player.toLowerCase())
                                    ?.allPlayedGames ?? 0)) *
                                1000,
                        ) / 10
                }
            }
        }
    }

    const getPlayerAllTypeTotalGames = () => {
        for (const playerr of Object.values(PlayerAccounts)) {
            const games = playerGames.value.find(
                (player) => player.username.toLowerCase() == playerr.toLowerCase(),
            )?.games
            const stats = playerHistoryData.value.find((player) => player.username == playerr)?.data.stats
            const tgam = (stats?.draw ?? 0) + (stats?.lose ?? 0) + (stats?.won ?? 0) + (stats?.stalemate ?? 0)
            const pla = players.value.find((x) => x.username.toLowerCase() == playerr.toLowerCase())
            if (games) {
                if (pla) {
                    console.log(games.length, playerr, tgam)
                    pla.allPlayedGames = games.length + tgam
                }
            } else {
                if (pla) {
                    pla.allPlayedGames = 0 + tgam
                }
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
            return import(`../assets/playerdata/${playerName}.json`).then((module) => {
                return { data: module.default as HistoryData, username: playerName }
            })
        })
        const jsonDatas = await Promise.all(promises)
        p.push(...jsonDatas)
        playerHistoryData.value = [...p]
    }

    onMounted(async () => {
        try {
            await getStats()
        } catch (error) {
            await getStats2()
        }

        await getAllPlayerGames()
        await getAllHistoryData()
        getEloGainsTodayForPlayer()
        findMostRecentGameBetweenPlayers()
        getPlayerAllTypeTotalGames()
        getStalmatedGames()
    })
    return {
        players,
        playerGames,
        playerHistoryData,
        playerEloGainsAndGames,
        mostEloToday,
        mostGamesToday,
        mostRecentGameBetweenPlayers,
    }
})
