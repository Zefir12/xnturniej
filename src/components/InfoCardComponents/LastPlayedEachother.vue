<template>
    <a
        :href="game.url"
        target="_blank"
        :class="(isDarkMode() ? 'card-class' : 'card-class-light') + ' cardon'"
        :style="{
            backgroundColor: isDarkMode() ? '#2e2e34' : '#fff',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'stretch',
        }"
    >
        <img width="50px" :src="playerMappings[props.game.white.username.toLowerCase() as PlayerAccounts]?.avatar" />
        <div
            :style="{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0px',
                flexGrow: '1',
                justifyContent: 'space-around',
            }"
        >
            <span>🤺 Ostatnio zagrali między sobą: 🐱‍👤</span>
            <span
                >{{ getWinText() }}:
                <span v-if="getWinText() != 'Remis'" :style="{ color: 'orange', fontWeight: 'bold' }">{{
                    playerMappings[getWinner() as PlayerAccounts]?.name
                }}</span></span
            >
        </div>
        <img width="50px" :src="playerMappings[props.game.black.username.toLowerCase() as PlayerAccounts]?.avatar" />
    </a>
</template>
<script setup lang="ts">
import { isDarkMode } from '@/common/helpers'
import type { PlayerAccounts } from '@/common/consts'
import { playerMappings } from '@/common/consts'
import type { GameDbData } from '@/models/models'

const getWinText = (): string => {
    if (props.game.white.result == 'win') return 'Wygrał/a'
    if (props.game.black.result == 'win') return 'Wygrał/a'
    return 'Remis'
}

const getWinner = (): string => {
    if (props.game.white.result == 'win') return props.game.white.username.toLowerCase()
    return props.game.black.username.toLowerCase()
}

const props = defineProps<{ game: GameDbData }>()
</script>
<style scoped>
.cardon {
    transition-property: all;
    transition-duration: 0.2s;
    overflow: hidden;
    height: 50px;
    font-size: 12px;
}

.cardon:hover {
    box-shadow:
        0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.card-class {
    background-image: linear-gradient(to top, #18181b, #2e2e34);
}

.card-class-light {
    background-image: linear-gradient(to top, #fff, #85858881);
}
</style>
