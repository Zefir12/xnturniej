import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { getUserMemberStats } from '@/services/chessService'
import { PlayerAccounts } from '@/common/consts'
import type { ChessStats, Rapid, Tactics } from '@/models/models'

export const useMainStore = defineStore('main', () => {
    const players = ref<ChessStats[]>([])

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

    onMounted(() => {
        getStats()
    })
    return { getStats, players }
})
