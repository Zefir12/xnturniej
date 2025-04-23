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

export const getRandomSuccessMessage = (): string => {
    const successMessages = [
        'Udało się!',
        'O dziwo jeszcze serwer to zapisał',
        'Chyba zadziałało',
        'Ledwo ale sie zapisało',
        'Operacja zakończona sukcesem.',
        'Cudem się udało, nie pytaj jak',
        'No i poszło... chyba dobrze',
        'Zapisało się, zanim coś wybuchło',
        'Server nie umarł, więc uznajmy to za sukces',
        'Zapisane! Przynajmniej według logów',
        'Powiedzmy, że działa',
        'Technicznie rzecz biorąc — sukces',
        'Nie wiemy czemu, ale działa',
        'Nie rozwaliło niczego, więc git',
        'Tym razem obeszło się bez dramy',
        'Jakimś cudem przeszło — nie ruszaj już',
    ]
    return successMessages[Math.floor(Math.random() * successMessages.length)]
}
