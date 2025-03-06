export interface PlayerRankingDto {
    player: string
    rapids: {
        rating: number
        change: number
        amountPlayed: number
    }
    tactics: {
        rating: number
        change: number
        amountDone: number
        timeSpent: number
    }
    pategGamesPercent: number
    allGamesPlayed: number
    mostPlayedOpening: {
        opening: string
        count: number
        winPercent: number
        lossPercent: number
        drawPercent: number
    }
}

export interface PlayerRnkingPackedDTO {
    [key: string]: PlayerRankingDto | null
}
