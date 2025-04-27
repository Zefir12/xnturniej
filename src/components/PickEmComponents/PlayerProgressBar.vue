<template>
    <div class="main">
        <img
            v-if="props.uuid"
            :src="playerMappings[uuidToPlayer(props.uuid) as PlayerAccounts].avatar ?? avatar"
            :style="{ width: '34px', height: '34px', borderRadius: '3px' }"
        />
        <img v-else :src="avatar" :style="{ width: '34px', height: '34px', borderRadius: '3px' }" />
        <div v-if="props.uuid" :style="{ width: '100%', height: '100%' }">
            <div :style="{ fontSize: '11px' }">
                {{ playerMappings[uuidToPlayer(props.uuid) as PlayerAccounts].name }}: {{ props.value }}%
            </div>
            <div class="progress">
                <div
                    :style="{
                        width: `${props.value}%`,
                        backgroundColor: 'orange',
                        minHeight: '100%',
                        borderRadius: '5px',
                    }"
                ></div>
            </div>
        </div>
        <div v-else :style="{ width: '100%', height: '100%' }">
            <div :style="{ fontSize: '11px' }">{{ 'Brak' }}: {{ props.value }}%</div>
            <div class="progress">
                <div
                    :style="{
                        width: `${props.value}%`,
                        backgroundColor: 'orange',
                        minHeight: '100%',
                        borderRadius: '5px',
                    }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlayerAccounts, playerMappings, uuidToPlayer } from '@/common/consts'
import avatar from '@/assets/twitchicons/defaultavatar.png'
const props = defineProps<{ uuid?: string; value: number }>()
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: row;
}

.progress {
    border-radius: 5px;
    min-width: 100%;
    height: 20px;
    background-color: #3f3f46;
}
</style>
