import { defineStore } from 'pinia'
import { onMounted, ref, onBeforeMount } from 'vue'
import { getEventdata, getPlayerData } from '@/services/chessService'
import { PlayerAccounts, uuidToPlayer } from '@/common/consts'
import type { PlayerStats } from '@/models/models'
import type { EventDataDto, PlayerRankingDto } from '@/models/dto'

export const useMainStore = defineStore('main', () => {
    const players = ref<PlayerRankingDto[]>([])
    const events = ref<EventDataDto>()

    const getPlayerDataFromServer = async () => {
        const data = await getPlayerData()
        const playerList = []
        for (const name of Object.values(PlayerAccounts)) {
            const p = data.find((player) => player.player == name)
            if (!p) throw new Error(`Player ${name} not found`)
            playerList.push(p)
        }
        players.value = [...playerList]
    }

    const getEventDataFromServer = async () => {
        const data = await getEventdata()
        events.value = data
    }

    onMounted(async () => {
        await getPlayerDataFromServer()
        await getEventDataFromServer()
    })
    return {
        players,
        events,
    }
})
