<template>
    <div class="page-container">
        <div class="content-container">
            <div :style="{ marginBottom: '3rem', marginTop: '1rem', textAlign: 'center' }">
                <h2>Turniej Wystartował!</h2>
                Codziennie na kanale <a :href="'https://twitch.tv/xntentacion'">twitch.tv/xntentacion</a> o 16:00, 24-27
                kwietnia
                <div :style="{ position: 'absolute', top: '0.4rem', right: '1rem' }">
                    <MyInfo />
                </div>
            </div>
            <MainNavBar />
            <RatingTable :class="{ 'fullscreen-table': uiStore.dataTableFullscreen }" />
            <ContentPanel :style="{ display: uiStore.dataTableFullscreen ? 'none' : 'flex' }" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import MyInfo from '@/components/MyInfo.vue'
import RatingTable from '@/components/RatingTable.vue'
import { useUiStore } from '@/stores/uiStore'
import ContentPanel from '@/components/ContentPanel.vue'
import MainNavBar from '@/components/MainNavBar.vue'

const uiStore = useUiStore()
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && uiStore.dataTableFullscreen) {
        uiStore.dataTableFullscreen = false
    }
}

const saveScrollPosition = () => {
    try {
        sessionStorage.setItem('scrollPosition', JSON.stringify(window.scrollY))
    } catch (error) {
        console.error('Failed to save scroll position:', error)
    }
}

const restoreScrollPosition = () => {
    try {
        const savedPosition = sessionStorage.getItem('scrollPosition')
        if (savedPosition !== null) {
            window.scrollTo(0, parseInt(JSON.parse(savedPosition)))
        } else {
            window.scrollTo(0, 0) // Default to top if no saved position
        }
    } catch (error) {
        console.error('Failed to restore scroll position:', error)
        window.scrollTo(0, 0) // Default to top on error
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
    restoreScrollPosition()
    window.addEventListener('beforeunload', saveScrollPosition)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('beforeunload', saveScrollPosition)
})
</script>

<style scoped>
.content-container {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}

.fullscreen-table {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: 1000;
    overflow: auto;
}

/* add a media query for smaller screens */
@media (max-width: 868px) {
    .content-container {
        flex-direction: column; /* switch to column layout on smaller screens */
        align-items: stretch;
        justify-content: stretch;
    }
}
/* Add this media query */
@media (max-width: 768px) {
    .page-container {
        overflow: auto; /* or overflow: visible; */
    }
}

@media (min-width: 868px) {
    .page-container {
        margin-left: 16px;
        margin-right: 16px;
    }
}

.info-card {
    display: flex;
}

@media (max-width: 868px) {
    .info-card {
        display: none;
    }
}
</style>
