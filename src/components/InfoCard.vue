<template>
    <div
        :style="{
            backgroundColor: isDarkMode() ? '#18181b' : '#fff',
        }"
        class="main-container"
    >
        <div class="inside-container">
            <span :style="{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', position: 'relative' }"
                >Nadchodzące Wydarzenia
            </span>
            <CustomCard />
            <CustomCard2 />
            <span
                :style="{
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    position: 'relative',
                    marginTop: '20px',
                }"
                >Najnowsze
            </span>
            <MostEloCard
                v-if="mostElo() && mostElo()?.elo != 0"
                :player="mostElo()?.player ?? ''"
                :elo="mostElo()?.elo ?? 0"
            />
            <MostGamesCard
                v-if="store.events?.maxPlayedToday && store.events?.maxPlayedToday?.count != 0"
                :player="uuidToPlayer(store.events?.maxPlayedToday?.uuid ?? '')"
                :elo="store.events?.maxPlayedToday?.count ?? 0"
            />
            <LastPlayedEachother
                :style="{ flexGrow: '1' }"
                v-if="store.events?.lastPlayedEachOther"
                :game="JSON.parse(store.events?.lastPlayedEachOther.game)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { isDarkMode } from '@/common/helpers'
import { uuidToPlayer } from '@/common/consts'

import { useMainStore } from '@/stores/mainStore'
import MostEloCard from './InfoCardComponents/MostEloCard.vue'
import MostGamesCard from './InfoCardComponents/MostGamesCard.vue'
import LastPlayedEachother from './InfoCardComponents/LastPlayedEachother.vue'
import CustomCard from './InfoCardComponents/CustomCard.vue'
import CustomCard2 from './InfoCardComponents/CustomCard2.vue'

const store = useMainStore()

const mostElo = (): { player: string; elo: number } | null => {
    const maxPlayer = store.players.reduce((max, current) => {
        return current.rapids.change > max.rapids.change ? current : max
    }, store.players[0])
    return { player: maxPlayer?.player, elo: maxPlayer?.rapids.change }
}
</script>

<style scoped>
.main-container {
    position: relative;
    display: flex;
    height: 600px;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.4s ease;
}

@media (max-width: 868px) {
    .inside-container {
        font-size: 12px;
        width: 100vw;
    }
}

.inside-container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    min-width: 325px;
    gap: 1rem;
    align-items: stretch;
}
</style>
