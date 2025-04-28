import type { Ladder } from '@/components/PickEmComponents/LaddersPage.vue'

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

export type PlayerPrivateData = {
    groups: string
    crystallBall?: Record<string, string | string[] | null | number>
    group_points: number
    total_points: number
    ladder_points: number
    ball_points: number
    favourite?: string
    ladderW?: Ladder
    ladderL?: Ladder
}
