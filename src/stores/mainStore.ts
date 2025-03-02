import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { getUserGamesFromCurrentMonth, getUserMemberStats } from '@/services/chessService'
import { PlayerAccounts } from '@/common/consts'
import type { ChessGame, ChessStats, HistoryData, Rapid, Tactics } from '@/models/models'

export const useMainStore = defineStore('main', () => {
    const players = ref<ChessStats[]>([])
    const playerGames = ref<{ username: string; games: ChessGame[] }[]>([])
    const playerHistoryData = ref<{ username: string; data: HistoryData[] }[]>([])

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

    const getAllPlayerGames = async () => {
        const pgames = <{ username: string; games: ChessGame[] }[]>[]
        const promises = Object.values(PlayerAccounts).map((name) => {
            return getUserGamesFromCurrentMonth(name).then((data) => {
                return { username: name, games: data } as unknown as { username: string; games: ChessGame[] }
            })
        })
        const results = await Promise.all(promises)
        pgames.push(...results)
        playerGames.value = [...pgames]
    }

    const getAllHistoryData = async () => {
        const p = <{ username: string; data: HistoryData[] }[]>[]
        const promises = Object.values(PlayerAccounts).map((playerName) => {
            return import(`../assets/${playerName}.json`).then((module) => {
                return { data: module.default as HistoryData[], username: playerName }
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
    })
    return { getStats, players, playerGames, playerHistoryData }
})
