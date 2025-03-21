const getStreamerStatus = async (playerNick: string): Promise<{ isLive: boolean; game: string }> => {
    try {
        const data = await fetch('https://kick.com/api/v2/channels/' + playerNick)
        const textData = await data.text()
        const pData = JSON.parse(textData)
        const categories = pData.livestream?.categories
        let category = ''
        if (categories) {
            category = categories[0].name
        }
        return { isLive: textData.indexOf('"is_live":true') != -1, game: category }
    } catch (error) {
        throw new Error(`Network error: ${error}`)
    }
}

export { getStreamerStatus }
