import { PlayerAccounts, playerMappings } from './consts'

// export const isDarkMode = () => {
//     return window.matchMedia('(prefers-color-scheme: dark)').matches
// }

export const isDarkMode = () => {
    const rootColorScheme = getComputedStyle(document.documentElement).getPropertyValue('color-scheme').trim()
    return rootColorScheme === 'dark'
}

export const getGroupsFromString = (input: string) => {
    const result = input
        .split('-') // Split the string into separate JSON arrays
        .map((str) => JSON.parse(str)) // Parse each JSON array
        .map((arr) => arr.map(Number))
    return result
}

const getGroupPoints = (guess: number[], answer: number[]) => {
    let score = 0

    for (let i = 0; i < 4; i++) {
        if (guess[i] === answer[i]) {
            score += 3 // exact match
        } else {
            const inSameHalf =
                (i < 2 && (guess[0] === answer[i] || guess[1] === answer[i])) ||
                (i >= 2 && (guess[2] === answer[i] || guess[3] === answer[i]))

            if (inSameHalf) {
                score += 1
            }
        }
    }
    console.log(score, guess, answer)
    return score
}

export const getGroupAPoints = (guess: number[][]) => {
    const res = getGroupPoints(guess[0], [1, 2, 3, 4])
    return res
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
