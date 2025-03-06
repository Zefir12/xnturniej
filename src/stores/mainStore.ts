import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
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
            playerList.push(data[name] as PlayerRankingDto)
        }
        players.value = [...playerList]
    }

    const getEventDataFromServer = async () => {
        const data = await getEventdata()
        events.value = data
        console.log(uuidToPlayer(data.maxPlayedToday.uuid))
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
