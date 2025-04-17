import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePickemStore = defineStore('Pickem Store', () => {
    const groups = ref([
        {
            group: 'a',
            players: [
                { place: '1', uuid: '' },
                { place: '2', uuid: '' },
                { place: '3', uuid: '' },
                { place: '4', uuid: '' },
            ],
        },
        {
            group: 'b',
            players: [
                { place: '1', uuid: '' }, //a869eba0-ad12-11eb-b429-1d193d279471
                { place: '2', uuid: '' },
                { place: '3', uuid: '' },
                { place: '4', uuid: '' },
            ],
        },
        {
            group: 'c',
            players: [
                { place: '1', uuid: '' },
                { place: '2', uuid: '' },
                { place: '3', uuid: '' },
                { place: '4', uuid: '' },
            ],
        },
        {
            group: 'd',
            players: [
                { place: '1', uuid: '' },
                { place: '2', uuid: '' },
                { place: '3', uuid: '' },
                { place: '4', uuid: '' },
            ],
        },
    ])

    const getGroup = (group: string) => {
        const grp = groups.value.find((x) => x.group == group)
        if (grp == null) return []
        return grp.players
    }

    return { getGroup }
})
