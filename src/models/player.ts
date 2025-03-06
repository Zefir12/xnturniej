export interface PlayerData {
    rating: number
    elo: number
    rapids: number
    totalSeconds: number
    passedCount: number
    failedCount: number
    totalCount: number
    lastDate: string
}

export interface PlayerDTO {
    [key: string]: PlayerData | null
}
