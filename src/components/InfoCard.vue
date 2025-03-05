<template>
    <div :style="{ backgroundColor: isDarkMode() ? '#18181b' : '#fff' }" class="main-container">
        <div :style="{ backgroundColor: isDarkMode() ? '#121212' : '#fff' }" class="shadow-div"></div>
        <div class="inside-container">
            <span :style="{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }">Wydarzenia</span>
            <MostEloCard
                v-if="store.mostEloToday.elo != 0"
                :player="store.mostEloToday.player"
                :elo="store.mostEloToday.elo"
            />
            <MostGamesCard
                v-if="store.mostEloToday.elo != 0"
                :player="store.mostGamesToday.player"
                :elo="store.mostGamesToday.games"
            />
            <LastPlayedEachother
                v-if="store.mostRecentGameBetweenPlayers.game"
                :game="store.mostRecentGameBetweenPlayers.game"
            />
            {{ 'Jeszcze tylko statystyki kubona są lekko pospute, reszta git' }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { isDarkMode } from '@/common/helpers'
import { useMainStore } from '@/stores/mainStore'
import MostEloCard from './InfoCardComponents/MostEloCard.vue'
import MostGamesCard from './InfoCardComponents/MostGamesCard.vue'
import LastPlayedEachother from './InfoCardComponents/LastPlayedEachother.vue'

const store = useMainStore()

//get most played games today
//get last pat that happend
//get last game between players and result
</script>

<style scoped>
.main-container {
    position: relative;
    width: 30rem;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    z-index: 8;
    box-shadow:
        0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.inside-container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    align-items: stretch;
}
.shadow-div {
    position: absolute;
    border-radius: 12px;
    top: 0;
    left: -20px;
    width: 24px;
    height: 100%;
    z-index: 9;
}
</style>
