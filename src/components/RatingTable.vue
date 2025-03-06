<template>
    <div class="datatable" :style="{ width: uiStore.sidePanelOpen ? '100%' : '1200px' }">
        <DataTable
            :value="store.players"
            :defaultSortOrder="-1"
            scrollable
            class="custom-datatable"
            :sortField="'rapids.rating'"
            :sortOrder="-1"
            tableStyle="min-width: 50rem; background-color: #18181b"
        >
            <Column field="username" header="Zawodnik" frozen>
                <template #body="{ data }">
                    <div
                        :style="{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: '0px',
                            width: '15rem',
                        }"
                    >
                        <img
                            :style="{ width: '50px', height: '50px', margin: '0' }"
                            :src="playerMappings[data.player as PlayerAccounts].avatar"
                        />
                        <div>
                            <HoverableText>
                                <b :style="{ cursor: 'pointer', marginLeft: '0.5rem' }">
                                    {{ playerMappings[data.player as PlayerAccounts].name }}
                                </b>
                            </HoverableText>
                        </div>
                        <a
                            v-if="playerMappings[data.player as PlayerAccounts].twitch"
                            :style="{ width: '16px', height: '16px', marginLeft: '8px' }"
                            :href="playerMappings[data.player as PlayerAccounts].twitch"
                            target="_blank"
                        >
                            <img class="hoverable" :style="{ width: '16px', height: '16px' }" :src="TwitchIcon"
                        /></a>
                        <a
                            v-if="playerMappings[data.player as PlayerAccounts].kick"
                            :style="{ width: '16px', height: '16px', marginLeft: '4px', cursor: 'pointer' }"
                            :href="playerMappings[data.player as PlayerAccounts].kick"
                            target="_blank"
                        >
                            <img :style="{ width: '16px', height: '16px' }" :src="KickIcon"
                        /></a>
                        <a
                            :style="{ width: '16px', height: '16px', marginLeft: '4px', cursor: 'pointer' }"
                            :href="`https://www.chess.com/member/${data.player}`"
                            target="_blank"
                        >
                            <img class="hoverable" :style="{ width: '16px', height: '16px' }" :src="ChesscomIcon"
                        /></a>
                    </div>
                </template>
            </Column>
            <Column field="rapids.rating" sortable>
                <template #header>
                    <div :style="{ textAlign: 'center', width: '10rem' }">
                        <span>Ranking Rapidów</span>
                        <span :style="{ color: 'orange', textWrap: 'nowrap' }"> [zmiana dzisiaj]</span>
                    </div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            display: 'flex',
                            flexDirection: 'row',
                            color: getColor(data.rapids.rating, 100, 1200),
                        }"
                    >
                        <div :style="{ width: '110px', textAlign: 'end', marginRight: '0.3rem' }">
                            {{ data.rapids.rating }}
                        </div>
                        <div>
                            <span
                                v-if="data.rapids.change != 0"
                                :style="{ color: data.rapids.change >= 0 ? 'orange' : 'red' }"
                            >
                                {{ '[' + (data.rapids.change > 0 ? '+' : '') + data.rapids.change + ']' }}
                            </span>
                        </div>
                    </div>
                </template>
            </Column>
            <Column field="pategGamesPercent" sortable>
                <template #header>
                    <div :style="{ textAlign: 'center', width: '9rem' }">
                        Partie zakończone patem
                        <span :style="{ color: 'orange' }">[%] 💀</span>
                    </div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            width: '12rem',
                            textAlign: 'center',
                            color: getColor(data.pategGamesPercent, 0, 6, true),
                        }"
                    >
                        {{ data.pategGamesPercent + '%' }}
                    </div>
                </template>
            </Column>
            <Column field="mostPlayedOpening.count" sortable>
                <template #header>
                    <div
                        :style="{
                            margin: 'auto',
                            textAlign: 'center',
                            width: '12rem',
                            maxWidth: '12rem',
                        }"
                    >
                        Najczęsciej grany opening
                        <span :style="{ color: 'orange' }"> [Ilość partii]</span>
                    </div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            color: getColor(data.mostPlayedOpening.count ?? 0, 0, 200),
                            textAlign: 'center',
                        }"
                    >
                        <a
                            :style="{
                                color: getColor(data.mostPlayedOpening.count ?? 0, 0, 200),
                                textAlign: 'center',
                            }"
                            :href="data.mostPlayedOpening.name"
                            target="_blank"
                        >
                            {{
                                data.mostPlayedOpening.name
                                    .replace('https://www.chess.com/openings/', '')
                                    .replace(/-/g, ' ') ?? '-'
                            }}</a
                        >
                        <span :style="{ color: 'orange' }">{{ ' [' + data.mostPlayedOpening.count + ']' }}</span>
                    </div>
                </template>
            </Column>
            <Column field="tactics.rating" sortable style="max-width: 10rem">
                <template #header>
                    <div :style="{ textAlign: 'center', width: '5rem' }">Ranking w Zadaniach</div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            color: getColor(data.tactics.rating ?? 0, 800, 2300),
                            textAlign: 'center',
                        }"
                    >
                        {{ data.tactics.rating ?? '-' }}
                    </div>
                </template>
            </Column>
            <Column field="rapids.amountPlayed" sortable>
                <template #header>
                    <div :style="{ textAlign: 'center', width: '10rem' }">
                        Zagrane rapidy <span :style="{ color: 'orange' }">[zagrane dzisiaj]</span>
                    </div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            color: getColor(data.rapids.amountPlayed ?? 0, 1, 1000),
                            textAlign: 'center',
                        }"
                    >
                        {{ data.rapids.amountPlayed }}<span :style="{ color: 'orange' }" v-if="false"> [{{ 0 }}]</span>
                    </div>
                </template>
            </Column>
            <Column field="tactics.amountDone" sortable>
                <template #header>
                    <div :style="{ textAlign: 'center', width: '4.5rem' }">Zrobione zadanka</div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            color: getColor(data.tactics.amountDone ?? 0, 100, 1500),
                            textAlign: 'center',
                        }"
                    >
                        {{ data.tactics.amountDone ?? 0 }}
                    </div>
                </template>
            </Column>
            <Column field="tactics.timeSpent" sortable style="max-width: 12rem">
                <template #header>
                    <div :style="{ textAlign: 'center', width: '12rem' }">Czas spędzony na zadaniach[HH:MM]</div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            color: getColor(data.tactics.timeSpent ?? 0, 0, 100000),
                            textAlign: 'center',
                        }"
                    >
                        {{
                            Math.floor((data.tactics.timeSpent ?? 0) / 3600)
                                .toString()
                                .padStart(2, '0') +
                            ':' +
                            Math.floor(((data.tactics.timeSpent ?? 0) / 60) % 60)
                                .toString()
                                .padStart(2, '0')
                        }}
                    </div>
                </template>
            </Column>
            <Column field="allGamesPlayed" sortable>
                <template #header>
                    <div :style="{ textAlign: 'center', width: '8rem' }">Wszystkie partie w sumie</div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            color: getColor(data.allGamesPlayed ?? 0, 11, 1200),
                            textAlign: 'center',
                        }"
                    >
                        {{ data.allGamesPlayed ?? 0 }}
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/mainStore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { PlayerAccounts, playerMappings } from '@/common/consts'
import { isDarkMode } from '@/common/helpers'
import TwitchIcon from '../assets/icons/twitch-icon.png'
import KickIcon from '../assets/icons/kick.png'
import ChesscomIcon from '../assets/icons/chesscom.png'
import { useUiStore } from '@/stores/uiStore'
import HoverableText from './HoverableText.vue'

const uiStore = useUiStore()
const store = useMainStore()

const getColor = (value: number, min: number, max: number, reverse = false) => {
    const isDark = isDarkMode()
    const ratio = (value - min) / (max - min)
    const r = Math.round(255 * (reverse ? ratio : 1 - ratio))
    if (isDark) {
        return `rgb(${r}, ${255}, ${r})`
    }
    return `rgb(${0}, ${255 - r}, ${0})`
}
</script>

<style scoped>
.datatable {
    transition: all 0.4s ease;
    border-radius: 12px;
    overflow: hidden;
    max-width: 90vw;
    line-height: 1.6;
    font-size: 16px;
    z-index: 10;
    box-shadow:
        0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

/* Scoped to your component */
.custom-datatable :deep(.p-datatable-table-container) {
    overflow-x: scroll !important;
    scrollbar-width: auto;
    -ms-overflow-style: auto;
}

/* .custom-datatable :deep(.p-datatable-table-container)::-webkit-scrollbar {
    height: 12px;
}

.custom-datatable :deep(.p-datatable-table-container)::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 6px;
}

.custom-datatable :deep(.p-datatable-table-container)::-webkit-scrollbar-track {
    background-color: #f5f5f5;
} */
</style>
