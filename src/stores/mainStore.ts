import { defineStore } from 'pinia'
import { onMounted, ref, onBeforeMount } from 'vue'
import { getEventdata, getPlayerData } from '@/services/chessService'
import { PlayerAccounts, uuidToPlayer } from '@/common/consts'
import type { PlayerStats } from '@/models/models'
import type { EventDataDto, PlayerRankingDto } from '@/models/dto'
import { getAllPlayers } from '@/common/helpers.js'
import { getStreamerStatus } from '@/services/kickService.js'
import { isValid } from 'date-fns'
import { getStreamerTwitchData } from '@/services/twitchService'

export const useMainStore = defineStore('main', () => {
    const players = ref<PlayerRankingDto[]>([])
    const events = ref<EventDataDto>()
    const kickStreamers = ref<{ live: boolean; game: string; player: string }[]>([])
    const twitchStreamers = ref<{ live: boolean; game: string; uuid: string }[]>([])

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

    const getStreamersStatusFromAPI = async () => {
        const players = getAllPlayers()
        const promises = players
            .filter((player) => player.kick) // Only include players with a defined kick URL
            .map((player) =>
                getStreamerStatus(player.kick?.replace('https://kick.com/', '') ?? '').then((data) => ({
                    live: data.isLive,
                    game: data.game,
                    player: player.name,
                })),
            )
        const results = await Promise.all(promises)
        kickStreamers.value = results
    }

    const getTwitchStreamerStatusFromServer = async () => {
        const data = await getStreamerTwitchData()
        twitchStreamers.value = data
    }

    const getEventDataFromServer = async () => {
        const data = await getEventdata()
        events.value = data
    }

    onMounted(async () => {
        await getPlayerDataFromServer()
        await getEventDataFromServer()
        await getTwitchStreamerStatusFromServer()
        await getStreamersStatusFromAPI()
    })
    return {
        players,
        events,
        kickStreamers,
        twitchStreamers,
    }
})
