<script setup lang="ts">
import InfoCard from './components/InfoCard.vue'
import MyInfo from './components/MyInfo.vue'
import RatingTable from './components/RatingTable.vue'
</script>

<template>
    <div :style="{ position: 'absolute', bottom: '0', right: '0', opacity: '0.5' }">
        <MyInfo :style="{ padding: '0.2rem' }" />
    </div>

    <div class="page-container">
        <div class="content-container">
            <RatingTable />
            <InfoCard />
        </div>
    </div>
</template>

<style scoped>
.page-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.content-container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
}
</style>
