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
    Bladii = 'kptbladii',
    Zwierzak = 'zwierzaak',
    Taku = 'uczesie_takuliskiszachuli',
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
import bladii from '../assets/twitchicons/bladii.png'
import zwierzak from '../assets/twitchicons/zwierzak.png'
import hiszpan from '../assets/twitchicons/hiszpan.png'
import taku from '../assets/twitchicons/taku.png'

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
        case '5177ad7a-3e3e-11eb-b1e4-4fc24844be0f':
            return PlayerAccounts.Kubon
        case '8a2269ea-3dc0-11eb-8750-c5b5bc9f99f1':
            return PlayerAccounts.Demonz
        case 'cc9cbaec-71fe-11eb-b3f6-4b737133070f':
            return PlayerAccounts.Bladii
        case '661e726e-b17c-11ed-97ad-175efc8ca79c':
            return PlayerAccounts.Zwierzak
        case '97709332-e8df-11ef-ae1f-699fe3713de1':
            return PlayerAccounts.Taku
        default:
            throw new Error('Player not found')
    }
}

export const playerMappings = {
    [PlayerAccounts.Hiszpan]: {
        name: 'Hiszpan',
        avatar: hiszpan,
        twitch: 'https://www.twitch.tv/hiszpanitos',
        kick: 'https://kick.com/hiszpanitoss',
        uuid: '071f3ac4-5f0c-11eb-828b-1768796e906d',
        charColor: '#57312f',
    },
    [PlayerAccounts.Kasix]: {
        name: 'Kasix',
        avatar: kasix,
        twitch: 'https://www.twitch.tv/kasix',
        kick: undefined,
        uuid: '98f224b0-998c-11eb-9cd5-abe66a43618c',
        charColor: '#e1e11e',
    },
    [PlayerAccounts.Nieuczesana]: {
        name: 'Nieuczesana',
        avatar: nieuczesana,
        twitch: 'https://www.twitch.tv/nieuczesana',
        kick: 'https://kick.com/nieuczeska',
        uuid: '59482f96-4e7b-11eb-b365-3d75dc4dac27',
        charColor: '#942603',
    },
    [PlayerAccounts.Delord]: {
        name: 'Delord',
        avatar: delord,
        twitch: 'https://www.twitch.tv/delordione',
        kick: 'https://kick.com/delordione',
        uuid: '2eb6a6f0-3df4-11eb-b13f-edcfbaf98d7b',
        charColor: '#0078d4',
    },
    [PlayerAccounts.Nitro]: {
        name: 'Nitro',
        avatar: nitro,
        twitch: undefined,
        kick: 'https://kick.com/niter',
        uuid: 'a869eba0-ad12-11eb-b429-1d193d279471',
        charColor: '#040202',
    },
    [PlayerAccounts.Fornal]: {
        name: 'Tomasz Fornal',
        avatar: fornal,
        twitch: 'https://www.twitch.tv/tytusc',
        kick: undefined,
        uuid: '420d7862-acbe-11eb-9289-c516bf3f58be',
        charColor: '#98fb04',
    },
    [PlayerAccounts.RandomBruces]: {
        name: 'RandomBruce',
        avatar: randombruce,
        twitch: 'https://www.twitch.tv/randombrucetv',
        kick: undefined,
        uuid: 'd56506e2-747d-11ed-b280-8d2bac408b0d',
        charColor: '#52a42b',
    },
    [PlayerAccounts.Diables]: {
        name: 'Diables',
        avatar: diables,
        twitch: 'https://www.twitch.tv/diables',
        kick: undefined,
        uuid: '7814e9b0-410a-11eb-8e01-ef8706c45d64',
        charColor: '#6f1212',
    },
    [PlayerAccounts.Netrodal]: {
        name: 'Netrodal',
        avatar: netrodal,
        twitch: 'https://www.twitch.tv/netrodalo',
        kick: undefined,
        uuid: 'c49386f0-a924-11ed-88da-cd5896a24560',
        charColor: '#fb9804',
    },
    [PlayerAccounts.Bagieta]: {
        name: 'Bagieta',
        avatar: bagieta,
        twitch: 'https://www.twitch.tv/mbagietson',
        kick: undefined,
        uuid: '9182bba4-8cec-11ed-9f28-a1a555fdd6af',
        charColor: '#7e7ec8',
    },
    [PlayerAccounts.Suchar]: {
        name: 'MokrySuchar',
        avatar: suchar,
        twitch: 'https://www.twitch.tv/mokrysuchar',
        kick: 'https://kick.com/mokrysuchar',
        uuid: 'b68f03f2-41ef-11eb-b636-9ddfe076e3d4',
        charColor: '#09dff7',
    },
    [PlayerAccounts.Overpow]: {
        name: 'Overpow',
        avatar: overpow,
        twitch: 'https://www.twitch.tv/overpow',
        kick: undefined,
        uuid: 'dd3a3172-ee19-11ef-84e3-1d869f158093',
        charColor: '#73717a',
    },
    [PlayerAccounts.Kubon]: {
        name: 'Kubon',
        avatar: kubon,
        twitch: 'https://www.twitch.tv/kubon_',
        kick: 'https://kick.com/kubon',
        uuid: '5177ad7a-3e3e-11eb-b1e4-4fc24844be0f',
        charColor: '#c48687',
    },
    [PlayerAccounts.Demonz]: {
        name: 'Demonz',
        avatar: demonz,
        twitch: 'https://www.twitch.tv/demonzz1',
        kick: 'https://kick.com/demonzz1',
        uuid: '8a2269ea-3dc0-11eb-8750-c5b5bc9f99f1',
        charColor: '#4b2f29',
    },
    [PlayerAccounts.Bladii]: {
        name: 'Bladii',
        avatar: bladii,
        twitch: 'https://www.twitch.tv/bladii309',
        kick: undefined,
        uuid: 'cc9cbaec-71fe-11eb-b3f6-4b737133070f',
        charColor: '#4f4f4dX',
    },
    [PlayerAccounts.Zwierzak]: {
        name: 'Zwierzak',
        avatar: zwierzak,
        twitch: 'https://www.twitch.tv/zwierzaaak',
        kick: undefined,
        uuid: '661e726e-b17c-11ed-97ad-175efc8ca79c',
        charColor: '#d02f9f',
    },
    [PlayerAccounts.Taku]: {
        name: 'Taku',
        avatar: taku,
        twitch: undefined,
        kick: 'https://kick.com/takuu',
        uuid: '97709332-e8df-11ef-ae1f-699fe3713de1',
        charColor: '#fff',
    },
}

export const expirationDates = {
    groups: new Date('2025-04-24T14:30:00Z'),
    crystalball: new Date('2025-04-24T14:30:00Z'),
    laddersOpen: new Date('2025-04-25T19:00:00Z'),
    laddersClose: new Date('2025-04-26T15:00:00Z'),
}

export const groupsResults = [
    { name: 'a', players: ['Nitro', 'Kubon', 'Nieuczesana', 'Bladii'] },
    { name: 'b', players: ['RandomBruce', 'Kasix', 'Zwierzak', 'Netrodal'] },
    { name: 'c', players: ['Delord', 'Overpow', 'Bagieta', 'MokrySuchar'] },
    { name: 'd', players: ['Demonz', 'Hiszpan', 'Taku', 'Diables'] },
]
