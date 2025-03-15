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
        <a href="https://www.twitch.tv/diables" target="_blank"><img width="80px" :src="diables" /></a>
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
            <span>W niedziele, 16 marca</span>
            <span
                ><span :style="{ color: 'orange', fontWeight: 'bold' }">{{ 'Nieuczasana' }}</span
                >{{ ' vs ' }}<span :style="{ color: 'orange', fontWeight: 'bold' }">{{ 'Diables' }}</span></span
            >
            <span>Best of 9, o 50 subów</span>
        </div>
        <a href="https://www.twitch.tv/nieuczesana" target="_blank"><img width="80px" :src="nieuczesana" /></a>
    </div>
</template>
<script setup lang="ts">
import { isDarkMode } from '@/common/helpers'
import nieuczesana from '../../assets/twitchicons/nieuczesana.png'
import diables from '../../assets/twitchicons/diables.png'
</script>
<style scoped>
.cardon {
    transition-property: all;
    transition-duration: 0.2s;
    overflow: hidden;
    height: 80px;
    font-size: 12px;
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
