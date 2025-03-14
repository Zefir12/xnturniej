<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import CountDownTimer from './components/CountDownTimer.vue'
import MyInfo from './components/MyInfo.vue'
import RatingTable from './components/RatingTable.vue'
import { useUiStore } from './stores/uiStore'
import ContentPanel from './components/ContentPanel.vue'

const uiStore = useUiStore()
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && uiStore.dataTableFullscreen) {
        uiStore.dataTableFullscreen = false
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <div class="page-container">
        <div class="content-container">
            <div :style="{ marginBottom: '3rem', marginTop: '1rem' }">
                <CountDownTimer text="Do startu turnieju pozostało: " :date="new Date('2025-04-24T17:00:00')" />
                <div :style="{ position: 'absolute', top: '0.4rem', right: '1rem' }">
                    <MyInfo />
                </div>
            </div>
            <RatingTable :class="{ 'fullscreen-table': uiStore.dataTableFullscreen }" />
            <ContentPanel />
        </div>
    </div>
</template>

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
