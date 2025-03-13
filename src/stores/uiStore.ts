import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
    const dataTableFullscreen = ref(false)

    const setDataTableFullscreen = (value: boolean) => {
        dataTableFullscreen.value = value
    }

    return { dataTableFullscreen, setDataTableFullscreen }
})
