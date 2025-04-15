import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePickemStore = defineStore('Pickem Store', () => {
    const groups = ref([
        {
            group: 'a',
            players: [
                '071f3ac4-5f0c-11eb-828b-1768796e906d',
                '98f224b0-998c-11eb-9cd5-abe66a43618c',
                '59482f96-4e7b-11eb-b365-3d75dc4dac27',
                '2eb6a6f0-3df4-11eb-b13f-edcfbaf98d7b',
            ],
        },
        {
            group: 'b',
            players: [
                'a869eba0-ad12-11eb-b429-1d193d279471',
                '420d7862-acbe-11eb-9289-c516bf3f58be',
                'd56506e2-747d-11ed-b280-8d2bac408b0d',
                '7814e9b0-410a-11eb-8e01-ef8706c45d64',
            ],
        },
        {
            group: 'c',
            players: [
                'c49386f0-a924-11ed-88da-cd5896a24560',
                '9182bba4-8cec-11ed-9f28-a1a555fdd6af',
                'b68f03f2-41ef-11eb-b636-9ddfe076e3d4',
                'dd3a3172-ee19-11ef-84e3-1d869f158093',
            ],
        },
        {
            group: 'd',
            players: [
                '5177ad7a-3e3e-11eb-b1e4-4fc24844be0f',
                '8a2269ea-3dc0-11eb-8750-c5b5bc9f99f1',
                'cc9cbaec-71fe-11eb-b3f6-4b737133070f',
                '661e726e-b17c-11ed-97ad-175efc8ca79c',
            ],
        },
    ])

    const getGroup = (group: string) => {
        const grp = groups.value.find((x) => x.group == group)
        return grp.players
    }

    return { getGroup }
})
