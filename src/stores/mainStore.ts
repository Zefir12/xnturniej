import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { getPlayerData } from '@/services/chessService'
import { PlayerAccounts } from '@/common/consts'
import type { PlayerStats } from '@/models/models'
import type { PlayerRankingDto } from '@/models/dto'

export const useMainStore = defineStore('main', () => {
    const players = ref<PlayerRankingDto[]>([])

    const getPlayerDataFromServer = async () => {
        const data = await getPlayerData()
        const playerList = []
        for (const name of Object.values(PlayerAccounts)) {
            playerList.push(data[name] as PlayerRankingDto)
        }
        players.value = [...playerList]
    }

    onMounted(async () => {
        await getPlayerDataFromServer()
    })
    return {
        players,
    }
})
