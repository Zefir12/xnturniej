import type { PlayerRankingDto, PlayerRnkingPackedDTO } from '@/models/dto'
import type { PlayerStats } from '@/models/models'
import type { PlayerDTO } from '@/models/player'

const getPlayerData = async (): Promise<PlayerRnkingPackedDTO> => {
    try {
        let url = 'https://xnturniej.online/playerdata'
        if (import.meta.env.VITE_ENV == 'prod') {
            url = 'https://xnturniej.online/playerdata'
        }
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        yesterday.setHours(23)
        yesterday.setMinutes(59)
        yesterday.setSeconds(59)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: yesterday.toISOString(),
            }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data as PlayerRnkingPackedDTO
    } catch (error) {
        throw new Error(`Network error: ${error}`)
    }
}

export { getPlayerData }
