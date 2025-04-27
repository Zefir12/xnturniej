<template>
    <div class="main">
        <div :style="{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }">
            <div :style="{ height: '100px', display: 'flex', flexDirection: 'row' }">
                <img :style="{ height: '100%' }" :src="player.avatar ?? avatar" />
                <div :style="{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }">
                    <span
                        :style="{
                            marginTop: '-10px',
                            fontWeight: 'bold',
                            fontSize: '20px',
                            color: 'orange',
                            textAlign: 'center',
                        }"
                        >{{ player.name }}</span
                    >
                    <span :style="{ textAlign: 'center' }"
                        >Średnio obstawiane miejsce:
                        <span :style="{ color: 'orange', fontWeight: 'bold' }">{{ props.place }}</span></span
                    >
                </div>
            </div>
            <div>
                <div v-for="(vote, index) in props.votes" :key="vote">
                    {{ (props.votes, index) }}
                    <OptionProgrssBar :value="vote" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlayerAccounts, playerMappings, uuidToPlayer } from '@/common/consts'
import avatar from '@/assets/twitchicons/defaultavatar.png'
import OptionProgrssBar from '@/components/PickEmComponents/OptionProgressBar.vue'
const props = defineProps<{ uuid: string; place: number; votes: number[] }>()

const player = playerMappings[uuidToPlayer(props.uuid) as PlayerAccounts]
</script>

<style scoped>
.main {
    width: 380px;
    height: 300px;
    background-color: #18181b;
    border-radius: 10px;
    overflow: hidden;
}
</style>
