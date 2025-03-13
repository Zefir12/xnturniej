export interface PlayerRankingDto {
    player: string
    rapids: {
        rating: number
        change: number
        amountPlayed: number
        changePlayed: number
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

export interface EventDataDto {
    maxPlayedToday: { uuid: string; count: number }
}
