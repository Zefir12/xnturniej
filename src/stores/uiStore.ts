import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
    const sidePanelOpen = ref(true)

    return { sidePanelOpen }
})
