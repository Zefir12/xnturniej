export enum PlayerAccounts {
    Hiszpan = 'jakubjd',
    Kasix = 'kasix909',
    Nieuczesana = 'nieuczeszek',
    Delord = 'pablosabre',
    Nitro = 'nitro69penetrator',
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

export const playerMappings = {
    [PlayerAccounts.Hiszpan]: {
        name: 'Hiszpan',
        avatar: hiszpan,
        twitch: 'https://www.twitch.tv/hiszpanitos',
        kick: undefined,
    },
    [PlayerAccounts.Kasix]: { name: 'Kasix', avatar: kasix, twitch: 'https://www.twitch.tv/kasix', kick: undefined },
    [PlayerAccounts.Nieuczesana]: {
        name: 'Nieuczesana',
        avatar: nieuczesana,
        twitch: 'https://www.twitch.tv/nieuczesana',
        kick: undefined,
    },
    [PlayerAccounts.Delord]: {
        name: 'Delord',
        avatar: delord,
        twitch: 'https://www.twitch.tv/delordione',
        kick: undefined,
    },
    [PlayerAccounts.Nitro]: { name: 'Nitro', avatar: nitro, twitch: undefined, kick: 'https://kick.com/niter' },
    [PlayerAccounts.Fornal]: {
        name: 'Tomasz Fornal',
        avatar: fornal,
        twitch: 'https://www.twitch.tv/tytusc',
        kick: undefined,
    },
    [PlayerAccounts.RandomBruces]: {
        name: 'RandomBruce',
        avatar: randombruce,
        twitch: 'https://www.twitch.tv/randombrucetv',
        kick: undefined,
    },
    [PlayerAccounts.Diables]: {
        name: 'Diables',
        avatar: diables,
        twitch: 'https://www.twitch.tv/diables',
        kick: undefined,
    },
    [PlayerAccounts.Netrodal]: {
        name: 'Netrodal',
        avatar: netrodal,
        twitch: 'https://www.twitch.tv/netrodalo',
        kick: undefined,
    },
    [PlayerAccounts.Bagieta]: {
        name: 'Bagieta',
        avatar: bagieta,
        twitch: 'https://www.twitch.tv/mbagietson',
        kick: undefined,
    },
    [PlayerAccounts.Suchar]: {
        name: 'MokrySuchar',
        avatar: suchar,
        twitch: 'https://www.twitch.tv/mokrysuchar',
        kick: 'https://kick.com/mokrysuchar',
    },
    [PlayerAccounts.Overpow]: {
        name: 'Overpow',
        avatar: overpow,
        twitch: 'https://www.twitch.tv/overpow',
        kick: undefined,
    },
    [PlayerAccounts.Kubon]: {
        name: 'Kubon',
        avatar: kubon,
        twitch: 'https://www.twitch.tv/kubon_',
        kick: 'https://kick.com/kubon',
    },
    [PlayerAccounts.Demonz]: {
        name: 'Demonz',
        avatar: demonz,
        twitch: 'https://www.twitch.tv/demonzz1',
        kick: 'https://kick.com/demonzz1',
    },
}
