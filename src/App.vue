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
    overflow: hidden;
    min-height: 100vh;
    flex-direction: row;
}
.content-container {
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
}
/* add a media query for smaller screens */
@media (max-width: 868px) {
    .content-container {
        flex-direction: column; /* switch to column layout on smaller screens */
        align-items: center;
        justify-content: center;
    }
}
/* Add this media query */
@media (max-width: 768px) {
    .page-container {
        overflow: auto; /* or overflow: visible; */
    }
}
</style>
