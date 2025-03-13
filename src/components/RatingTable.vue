<template>
    <div class="datatable">
        <DataTable
            :value="store.players"
            :defaultSortOrder="-1"
            scrollable
            class="custom-datatable"
            :sortField="'rapids.rating'"
            :sortOrder="-1"
            tableStyle="min-width: 50rem; background-color: #18181b"
        >
            <Column field="username" frozen>
                <template #header>
                    <div
                        :style="{
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }"
                    >
                        <div :style="{ textAlign: 'center' }">Fullscreen:</div>
                        <div :style="{ backgroundColor: 'transparent', cursor: 'pointer', display: 'flex' }">
                            <HoverableText>
                                <IconArrowsMaximize
                                    v-if="!uiStore.dataTableFullscreen"
                                    @click="uiStore.setDataTableFullscreen(true)"
                                    color="orange"
                                />
                                <IconArrowsMinimize
                                    v-if="uiStore.dataTableFullscreen"
                                    @click="uiStore.setDataTableFullscreen(false)"
                                    color="orange"
                                />
                            </HoverableText>
                        </div>
                    </div>
                </template>
                <template #body="{ data }">
                    <div class="player-name-column">
                        <img
                            :style="{ width: '50px', height: '50px', margin: '0' }"
                            :src="playerMappings[data.player as PlayerAccounts].avatar"
                        />
                        <div class="player-name-container">
                            <div>
                                <HoverableText>
                                    <b :style="{ cursor: 'pointer', marginLeft: '0.5rem' }">
                                        {{ playerMappings[data.player as PlayerAccounts].name }}
                                    </b>
                                </HoverableText>
                            </div>
                            <div :style="{ display: 'flex', flexDirection: 'row' }">
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
                                    <img
                                        class="hoverable"
                                        :style="{ width: '16px', height: '16px' }"
                                        :src="ChesscomIcon"
                                /></a>
                            </div>
                        </div>
                    </div>
                </template>
            </Column>
            <Column field="rapids.rating" sortable>
                <template #header>
                    <div :style="{ textAlign: 'center', width: '10em' }">
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
                    <div :style="{ textAlign: 'center', width: '9em' }">
                        Partie zakończone patem
                        <span :style="{ color: 'orange' }">[%] 💀</span>
                    </div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            width: '12em',
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
                            width: '12em',
                            maxWidth: '12em',
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
                            minHeight: '52px',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            gap: '4px',
                            alignItems: 'center',
                        }"
                    >
                        <span :style="{ color: 'orange', marginLeft: '40px' }">{{
                            ' [' + data.mostPlayedOpening.count + ']'
                        }}</span>
                        <span
                            :style="{
                                color: getColor(data.mostPlayedOpening.count ?? 0, 0, 200),
                                textAlign: 'center',
                                marginLeft: '4px',
                                textDecoration: 'none',
                            }"
                            >{{ '&nbsp;'.repeat(6 - data.mostPlayedOpening.count.toString().length) }}
                            {{
                                data.mostPlayedOpening.name
                                    .replace('https://www.chess.com/openings/', '')
                                    .replace(/-/g, ' ') ?? '-'
                            }}</span
                        >
                    </div>
                </template>
            </Column>
            <Column field="tactics.rating" sortable style="max-width: 10em">
                <template #header>
                    <div :style="{ textAlign: 'center', width: '5em' }">Ranking w Zadaniach</div>
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
                    <div :style="{ textAlign: 'center', width: '10em' }">
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
                        {{ data.rapids.amountPlayed
                        }}<span
                            :style="{ color: 'orange' }"
                            v-if="data.rapids.changePlayed && data.rapids.changePlayed > 0"
                        >
                            [{{ data.rapids.changePlayed }}]</span
                        >
                    </div>
                </template>
            </Column>
            <Column field="tactics.amountDone" sortable>
                <template #header>
                    <div :style="{ textAlign: 'center', width: '4.5em' }">Zrobione zadanka</div>
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
            <Column field="tactics.timeSpent" sortable style="max-width: 12em">
                <template #header>
                    <div :style="{ textAlign: 'center', width: '12em' }">Czas spędzony na zadaniach[HH:MM]</div>
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
                    <div :style="{ textAlign: 'center', width: '8em' }">Wszystkie partie w sumie</div>
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
import { IconArrowsMaximize, IconArrowsMinimize } from '@tabler/icons-vue'

import HoverableText from './HoverableText.vue'
import { useUiStore } from '@/stores/uiStore'

const store = useMainStore()
const uiStore = useUiStore()

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
    line-height: 1.6;
    font-size: 16px;
    width: 100%;
    box-shadow:
        0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media (max-width: 868px) {
    .datatable {
        max-width: 100vw;
        font-size: 12px;
    }
}

.player-name-column {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px;
    width: 15rem;
}

@media (max-width: 868px) {
    .player-name-column {
        width: 140px;
        flex-wrap: nowrap;
        overflow: hidden;
    }
}

.player-name-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

@media (max-width: 868px) {
    .player-name-container {
        flex-direction: column;
    }
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
