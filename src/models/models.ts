export type ChessStats = {
    rating: number
    username: string
    tacticsRating: number
    playedMatches: number
    tacticsDone: number
}

export type ChessStatsResponse = {
    stats: {
        key: string
        stats: []
        gameCount: number
        lastPlayed: boolean
        lastDate?: string
    }[]
    lastType: string
    versus: {
        total: number
    }
    ratingOnlyStats: string[]
    officialRating: null
    lessonLevel: {
        icon: string
        name: string
        progress: number
    }
}

export type Player = {
    country: Country
    id: number
    create_date: string
    username: string
    country_id: number
    last_login_date: string
    points: number
    is_enabled: boolean
    membership_level: number
}

export type Country = {
    id: number
    code: string
    name: string
    iso3: string
    currency_code: string
    phone_code: number
}

export type Tactics = {
    key: string
    stats: {
        rating: number
        highest_rating: number
        highest_rating_date: number // Unix timestamp
        rating_time_change_days: number
        rating_time_change_value: number
        highest_rating_info: {
            timestamp: number // Unix timestamp
            rating: number
        }
        lowest_rating_info: {
            timestamp: number // Unix timestamp
            rating: number
        }
        total_seconds: number
        lowest_rating: number
        lowest_rating_date: number // Unix timestamp
        attempt_count: number
        passed_count: number
        failed_count: number
        last_date: string // ISO date string
    }
    gameCount: number
    lastPlayed: boolean
    lastDate: string // ISO date string
}

export type Rapid = {
    key: string
    stats: {
        rating: number
        highest_rating: number
        highest_rating_date: string // ISO date string
        rating_time_change_days: number
        rating_time_change_value: number
        total_game_count: number
        total_win_count: number
        total_loss_count: number
        total_draw_count: number
        avg_opponent_rating: number
        highest_opponent_rating: number
        best_win_opponent: {
            country: {
                id: number
                code: string
                name: string
                iso3: string
                currency_code: string
                phone_code: number
            }
            id: number
            create_date: string // ISO date string
            username: string
            first_name: string
            last_name: string
            country_id: number
            location: string
            last_login_date: string // ISO date string
            points: number
            is_enabled: boolean
            membership_level: number
        }
        best_win_opponent_id: number
    }
    gameCount: number
    lastPlayed: boolean
    lastDate: string // ISO date string
}

export type ChessGame = {
    url: string
    pgn: string
    time_control: string
    end_time: number
    rated: boolean
    tcn: string
    uuid: string
    initial_setup: string
    fen: string
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
}

export type HistoryData = {
    vs: {
        player: string
        lose: number
        won: number
        draw: number
        detailed: {
            win: number
            checkmated: number
            agreed: number
            repetition: number
            timeout: number
            resigned: number
            stalemate: number
            lose: number
            insufficient: number
            '50move': number
            timevsinsufficient: number
        }
    }[]

    openings: {
        name: string
        total: number
        results: {
            win: number
            checkmated: number
            agreed: number
            repetition: number
            timeout: number
            resigned: number
            stalemate: number
            lose: number
            insufficient: number
            '50move': number
            timevsinsufficient: number
        }
    }[]
    stats: {
        won: number
        draw: number
        lose: number
    }
}
