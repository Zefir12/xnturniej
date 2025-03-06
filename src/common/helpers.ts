import { PlayerAccounts, playerMappings } from './consts'

export const isDarkMode = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const playerByUuid = (
    uuid: string,
): { name: string; avatar: string; twitch: string; kick: undefined; uuid: string } | undefined => {
    const playerKeys = Object.keys(playerMappings)
    for (const player of playerKeys) {
        return playerMappings[player as PlayerAccounts] as {
            name: string
            avatar: string
            twitch: string
            kick: undefined
            uuid: string
        }
    }
}
