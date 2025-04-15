export type PlayerStats = {
    rating: number
    username: string
    tacticsRating: number
    playedMatches: number
    allPlayedGames: number
    tacticsDone: number
    timeSpentOnTatics: number
    stalemateGamesPercent: number
}

export interface GameDbData {
    url: string
    pgn: string
    time_control: string
    end_time: number
    rated: boolean
    accuracies: {
        white: number
        black: number
    }
    tcn: string
    uuid: string
    initial_setup: string
    fen: string
    start_time: number
    time_class: string
    rules: string
    white: {
        rating: number
        result: string
        '@id': string
        username: string
        uuid: string
    }
    black: {
        rating: number
        result: string
        '@id': string
        username: string
        uuid: string
    }
    eco: string
    opening: string
    fetchedAt: Date
    players: string[]
}

export interface TwitchUserWithId {
    _id: string
    twitchId: string
    displayName: string
    email?: string
}
