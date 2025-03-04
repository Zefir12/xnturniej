export interface TacticsData {
    rating: number
    elo: number
    rapids: number
    totalSeconds: number
    passedCount: number
    failedCount: number
    totalCount: number
    lastDate: string
}

export interface TacticsDTO {
    [key: string]: TacticsData | null
}

export interface TacticsDbData {
    rating: number
    totalSeconds: number
    passedCount: number
    failedCount: number
    date: number
}
