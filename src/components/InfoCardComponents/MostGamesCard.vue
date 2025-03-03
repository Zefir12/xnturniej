<template>
    <div
        :class="(isDarkMode() ? 'card-class' : 'card-class-light') + ' cardon'"
        :style="{
            backgroundColor: isDarkMode() ? '#2e2e34' : '#fff',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'stretch',
        }"
    >
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
            <span>⚔ Nawięcej zagranych gier dzisiaj: ⚔</span>
            <span
                >{{ playerMappings[props.player as PlayerAccounts]?.name }}:
                <span :style="{ color: 'orange', fontWeight: 'bold' }">{{ props.elo }}</span></span
            >
        </div>
        <img width="50px" :src="playerMappings[props.player as PlayerAccounts]?.avatar" />
    </div>
</template>
<script setup lang="ts">
import { isDarkMode } from '@/common/helpers'
import type { PlayerAccounts } from '@/common/consts'
import { playerMappings } from '@/common/consts'

const props = defineProps<{ player: string; elo: number }>()
</script>
<style scoped>
.cardon {
    transition-property: all;
    transition-duration: 0.2s;
    overflow: hidden;
    height: 50px;
}

.cardon:hover {
    box-shadow:
        0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.card-class {
    background-image: linear-gradient(to left, #18181b, #2e2e34);
}

.card-class-light {
    background-image: linear-gradient(to left, #fff, #85858881);
}
</style>
