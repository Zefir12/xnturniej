import { PlayerAccounts, playerMappings } from './consts'

// export const isDarkMode = () => {
//     return window.matchMedia('(prefers-color-scheme: dark)').matches
// }

export const isDarkMode = () => {
    const rootColorScheme = getComputedStyle(document.documentElement).getPropertyValue('color-scheme').trim()
    return rootColorScheme === 'dark'
}

export const getAllPlayers = () => {
    const playerKeys = Object.keys(playerMappings)
    return playerKeys.map((player) => playerMappings[player as PlayerAccounts])
}

export const getPlayerByNiceName = (name: string) => {
    return Object.values(playerMappings).find((player) => player.name == name)
}

export const getPlayerByUuid = (uuid: string) => {
    return Object.values(playerMappings).find((player) => player.uuid == uuid)
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
