const getStreamerTwitchData = async (): Promise<
    {
        uuid: string
        live: boolean
        game: string
    }[]
> => {
    try {
        let url = 'http://localhost:3000/streamerdata'
        if (import.meta.env.VITE_ENV == 'prod') {
            url = 'https://xnturniej.online/streamerdata'
        }
        const response = await fetch(url, {
            method: 'GET',
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data as {
            uuid: string
            live: boolean
            game: string
        }[]
    } catch (error) {
        throw new Error(`Network error: ${error}`)
    }
}

export { getStreamerTwitchData }
