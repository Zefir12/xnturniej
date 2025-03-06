export enum PlayerAccounts {
    Hiszpan = 'jakubjd',
    Kasix = 'kasix909',
    Nieuczesana = 'nieuczeszek',
    Delord = 'pablosabre',
    Nitro = 'niter77',
    Fornal = 'tomaszfornal',
    RandomBruces = 'szachowytapir',
    Diables = 'xdiables',
    Netrodal = 'didaskyler',
    Bagieta = 'bagietkaofficial',
    Suchar = 'mokrysucharek',
    Overpow = 'szachowychogath',
    Kubon = 'jakubon000',
    Demonz = 'demonzz1',
}
import bagieta from '../assets/twitchicons/bagieta.png'
import kasix from '../assets/twitchicons/kasix.png'
import nieuczesana from '../assets/twitchicons/nieuczesana.png'
import delord from '../assets/twitchicons/delord.png'
import nitro from '../assets/twitchicons/niter.png'
import fornal from '../assets/twitchicons/fornal.png'
import randombruce from '../assets/twitchicons/randombruce.png'
import diables from '../assets/twitchicons/diables.png'
import netrodal from '../assets/twitchicons/netrodal.png'
import suchar from '../assets/twitchicons/mokrysuchar.png'
import overpow from '../assets/twitchicons/overpow.png'
import kubon from '../assets/twitchicons/kubon.png'
import demonz from '../assets/twitchicons/demonz.png'
import hiszpan from '../assets/twitchicons/hiszpan.png'

export const uuidToPlayer = (uuid: string): string => {
    switch (uuid) {
        case '071f3ac4-5f0c-11eb-828b-1768796e906d':
            return PlayerAccounts.Hiszpan
        case '98f224b0-998c-11eb-9cd5-abe66a43618c':
            return PlayerAccounts.Kasix
        case '59482f96-4e7b-11eb-b365-3d75dc4dac27':
            return PlayerAccounts.Nieuczesana
        case '2eb6a6f0-3df4-11eb-b13f-edcfbaf98d7b':
            return PlayerAccounts.Delord
        case 'a869eba0-ad12-11eb-b429-1d193d279471':
            return PlayerAccounts.Nitro
        case '420d7862-acbe-11eb-9289-c516bf3f58be':
            return PlayerAccounts.Fornal
        case 'd56506e2-747d-11ed-b280-8d2bac408b0d':
            return PlayerAccounts.RandomBruces
        case '7814e9b0-410a-11eb-8e01-ef8706c45d64':
            return PlayerAccounts.Diables
        case 'c49386f0-a924-11ed-88da-cd5896a24560':
            return PlayerAccounts.Netrodal
        case '9182bba4-8cec-11ed-9f28-a1a555fdd6af':
            return PlayerAccounts.Bagieta
        case 'b68f03f2-41ef-11eb-b636-9ddfe076e3d4':
            return PlayerAccounts.Suchar
        case 'dd3a3172-ee19-11ef-84e3-1d869f158093':
            return PlayerAccounts.Overpow
        case 'v5177ad7a-3e3e-11eb-b1e4-4fc24844be0f':
            return PlayerAccounts.Kubon
        case '8a2269ea-3dc0-11eb-8750-c5b5bc9f99f1':
            return PlayerAccounts.Demonz
        default:
            throw new Error('Player not found')
    }
}

export const playerMappings = {
    [PlayerAccounts.Hiszpan]: {
        name: 'Hiszpan',
        avatar: hiszpan,
        twitch: 'https://www.twitch.tv/hiszpanitos',
        kick: undefined,
        uuid: '071f3ac4-5f0c-11eb-828b-1768796e906d',
    },
    [PlayerAccounts.Kasix]: {
        name: 'Kasix',
        avatar: kasix,
        twitch: 'https://www.twitch.tv/kasix',
        kick: undefined,
        uuid: '98f224b0-998c-11eb-9cd5-abe66a43618c',
    },
    [PlayerAccounts.Nieuczesana]: {
        name: 'Nieuczesana',
        avatar: nieuczesana,
        twitch: 'https://www.twitch.tv/nieuczesana',
        kick: undefined,
        uuid: '59482f96-4e7b-11eb-b365-3d75dc4dac27',
    },
    [PlayerAccounts.Delord]: {
        name: 'Delord',
        avatar: delord,
        twitch: 'https://www.twitch.tv/delordione',
        kick: 'https://kick.com/delordione',
        uuid: '2eb6a6f0-3df4-11eb-b13f-edcfbaf98d7b',
    },
    [PlayerAccounts.Nitro]: {
        name: 'Nitro',
        avatar: nitro,
        twitch: undefined,
        kick: 'https://kick.com/niter',
        uuid: 'a869eba0-ad12-11eb-b429-1d193d279471',
    },
    [PlayerAccounts.Fornal]: {
        name: 'Tomasz Fornal',
        avatar: fornal,
        twitch: 'https://www.twitch.tv/tytusc',
        kick: undefined,
        uuid: '420d7862-acbe-11eb-9289-c516bf3f58be',
    },
    [PlayerAccounts.RandomBruces]: {
        name: 'RandomBruce',
        avatar: randombruce,
        twitch: 'https://www.twitch.tv/randombrucetv',
        kick: undefined,
        uuid: 'd56506e2-747d-11ed-b280-8d2bac408b0d',
    },
    [PlayerAccounts.Diables]: {
        name: 'Diables',
        avatar: diables,
        twitch: 'https://www.twitch.tv/diables',
        kick: undefined,
        uuid: '7814e9b0-410a-11eb-8e01-ef8706c45d64',
    },
    [PlayerAccounts.Netrodal]: {
        name: 'Netrodal',
        avatar: netrodal,
        twitch: 'https://www.twitch.tv/netrodalo',
        kick: undefined,
        uuid: 'c49386f0-a924-11ed-88da-cd5896a24560',
    },
    [PlayerAccounts.Bagieta]: {
        name: 'Bagieta',
        avatar: bagieta,
        twitch: 'https://www.twitch.tv/mbagietson',
        kick: undefined,
        uuid: '9182bba4-8cec-11ed-9f28-a1a555fdd6af',
    },
    [PlayerAccounts.Suchar]: {
        name: 'MokrySuchar',
        avatar: suchar,
        twitch: 'https://www.twitch.tv/mokrysuchar',
        kick: 'https://kick.com/mokrysuchar',
        uuid: 'b68f03f2-41ef-11eb-b636-9ddfe076e3d4',
    },
    [PlayerAccounts.Overpow]: {
        name: 'Overpow',
        avatar: overpow,
        twitch: 'https://www.twitch.tv/overpow',
        kick: undefined,
        uuid: 'dd3a3172-ee19-11ef-84e3-1d869f158093',
    },
    [PlayerAccounts.Kubon]: {
        name: 'Kubon',
        avatar: kubon,
        twitch: 'https://www.twitch.tv/kubon_',
        kick: 'https://kick.com/kubon',
        uuid: 'v5177ad7a-3e3e-11eb-b1e4-4fc24844be0f',
    },
    [PlayerAccounts.Demonz]: {
        name: 'Demonz',
        avatar: demonz,
        twitch: 'https://www.twitch.tv/demonzz1',
        kick: 'https://kick.com/demonzz1',
        uuid: '8a2269ea-3dc0-11eb-8750-c5b5bc9f99f1',
    },
}
