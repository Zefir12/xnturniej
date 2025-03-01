import type { ChessStatsResponse } from '@/models/models'

const getUserStats = async (username: string): Promise<string> => {
    try {
        const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data as string
    } catch (error) {
        throw new Error(`Network error: ${error}`)
    }
}

const getUserMemberStats = async (username: string): Promise<ChessStatsResponse> => {
    try {
        const response = await fetch(
            `https://cors-bypass.biazej.workers.dev/?url=https://www.chess.com/callback/member/stats/${username}`,
        )
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data as ChessStatsResponse
    } catch (error) {
        throw new Error(`Network error: ${error}`)
    }
}

const getUserGames = async (username: string): Promise<string> => {
    try {
        const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data as string
    } catch (error) {
        throw new Error(`Network error: ${error}`)
    }
}

export { getUserStats, getUserMemberStats }
