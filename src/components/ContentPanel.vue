<template>
    <div class="main-containerr">
        <InfoCard :style="{ minWidth: '375px' }" />
        <InfoCardDates :style="{ minWidth: '375px' }" />
    </div>
</template>
<script setup lang="ts">
import InfoCard from './InfoCard.vue'
import InfoCardDates from './InfoCardDates.vue'
</script>

<style scoped>
.main-containerr {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 8px;
}

@media (min-width: 868px) {
    .main-containerr {
        flex-wrap: nowrap;
    }
}
</style>
