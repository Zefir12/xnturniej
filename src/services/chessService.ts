import type { EventDataDto, PlayerRankingDto } from '@/models/dto'
import type { PlayerStats } from '@/models/models'
import type { PlayerDTO } from '@/models/player'

const getPlayerData = async (): Promise<PlayerRankingDto[]> => {
    try {
        let url = 'http://localhost:3000/playerdata'
        if (import.meta.env.VITE_ENV == 'prod') {
            url = 'https://xnturniej.online/playerdata'
        }
        const yesterday = new Date()

        const gmt =
            (yesterday.getHours() < yesterday.getUTCHours() ? yesterday.getHours() + 24 : yesterday.getHours()) -
            yesterday.getUTCHours()
        yesterday.setUTCDate(yesterday.getUTCDate())
        yesterday.setUTCHours(yesterday.getUTCHours() + gmt)

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: yesterday.toISOString().split('T')[0],
            }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data as PlayerRankingDto[]
    } catch (error) {
        throw new Error(`Network error: ${error}`)
    }
}

const getEventdata = async (): Promise<EventDataDto> => {
    try {
        let url = 'http://localhost:3000/eventdata'
        if (import.meta.env.VITE_ENV == 'prod') {
            url = 'https://xnturniej.online/eventdata'
        }
        const response = await fetch(url, {
            method: 'GET',
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data as EventDataDto
    } catch (error) {
        throw new Error(`Network error: ${error}`)
    }
}

export { getPlayerData, getEventdata }
