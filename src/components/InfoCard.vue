<template>
    <div
        :style="{
            backgroundColor: isDarkMode() ? '#18181b' : '#fff',
            width: uiStore.sidePanelOpen ? '4rem' : '30rem',
        }"
        class="main-container"
    >
        <div :style="{ backgroundColor: isDarkMode() ? '#121212' : '#fff' }" class="shadow-div"></div>
        <div v-if="!uiStore.sidePanelOpen" class="inside-container">
            <span :style="{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', position: 'relative' }"
                >Wydarzenia
                <div :style="{ position: 'absolute', top: '0px', left: '0px' }">
                    <HoverableIcon>
                        <IconArrowBadgeLeftFilled />
                    </HoverableIcon>
                </div>
            </span>
            <MostEloCard v-if="mostElo()" :player="mostElo()?.player ?? ''" :elo="mostElo()?.elo ?? 0" />
            <MostGamesCard
                v-if="store.events?.maxPlayedToday?.count != 0"
                :player="uuidToPlayer(store.events?.maxPlayedToday?.uuid ?? '')"
                :elo="store.events?.maxPlayedToday?.count ?? 0"
            />
            <!-- <LastPlayedEachother
                v-if="store.mostRecentGameBetweenPlayers.game"
                :game="store.mostRecentGameBetweenPlayers.game"
            /> -->
        </div>
        <div v-else :style="{ padding: '1rem' }">
            <span :style="{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', position: 'relative' }">
                <div :style="{ position: 'absolute', top: '0px', left: '0px' }">
                    <HoverableIcon>
                        <IconArrowBadgeRightFilled />
                    </HoverableIcon>
                </div>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { isDarkMode } from '@/common/helpers'
import HoverableIcon from './HoverableIcon.vue'
import { useUiStore } from '@/stores/uiStore'
import { IconArrowBadgeLeftFilled } from '@tabler/icons-vue'
import { IconArrowBadgeRightFilled } from '@tabler/icons-vue'
import { uuidToPlayer } from '@/common/consts'

import { useMainStore } from '@/stores/mainStore'
import MostEloCard from './InfoCardComponents/MostEloCard.vue'
import MostGamesCard from './InfoCardComponents/MostGamesCard.vue'
// import LastPlayedEachother from './InfoCardComponents/LastPlayedEachother.vue'

const store = useMainStore()
const uiStore = useUiStore()

const mostElo = (): { player: string; elo: number } | null => {
    const maxPlayer = store.players.reduce((max, current) => {
        return current.rapids.change > max.rapids.change ? current : max
    }, store.players[0])
    return { player: maxPlayer.player, elo: maxPlayer.rapids.change }
}
</script>

<style scoped>
.main-container {
    position: relative;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    z-index: 8;
    overflow: hidden;
    transition: all 0.4s ease;
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
