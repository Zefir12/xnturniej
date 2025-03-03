<template>
    <div class="datatable">
        <DataTable
            :value="store.players"
            :defaultSortOrder="-1"
            :sortField="'rating'"
            :sortOrder="-1"
            tableStyle="min-width: 50rem; background-color: #18181b"
        >
            <Column field="username" header="Zawodnik" :style="{ width: '14rem' }">
                <template #body="{ data }">
                    <div :style="{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0px' }">
                        <img
                            :style="{ width: '50px', height: '50px', margin: '0' }"
                            :src="playerMappings[data.username as PlayerAccounts].avatar"
                        />
                        <b :style="{ cursor: 'pointer', marginLeft: '0.5rem' }">{{
                            playerMappings[data.username as PlayerAccounts].name
                        }}</b>
                        <a
                            v-if="playerMappings[data.username as PlayerAccounts].twitch"
                            :style="{ width: '16px', height: '16px', marginLeft: '8px' }"
                            :href="playerMappings[data.username as PlayerAccounts].twitch"
                            target="_blank"
                        >
                            <img class="hoverable" :style="{ width: '16px', height: '16px' }" :src="TwitchIcon"
                        /></a>
                        <a
                            v-if="playerMappings[data.username as PlayerAccounts].kick"
                            :style="{ width: '16px', height: '16px', marginLeft: '4px', cursor: 'pointer' }"
                            :href="playerMappings[data.username as PlayerAccounts].kick"
                            target="_blank"
                        >
                            <img :style="{ width: '16px', height: '16px' }" :src="KickIcon"
                        /></a>
                        <a
                            :style="{ width: '16px', height: '16px', marginLeft: '4px', cursor: 'pointer' }"
                            :href="`https://www.chess.com/member/${data.username}`"
                            target="_blank"
                        >
                            <img class="hoverable" :style="{ width: '16px', height: '16px' }" :src="ChesscomIcon"
                        /></a>
                    </div>
                </template>
            </Column>
            <Column field="rating" sortable style="width: 16rem">
                <template #header>
                    <div :style="{ textAlign: 'center', width: '100%' }">
                        <span>Ranking Rapidów</span>
                        <span :style="{ color: 'orange', textWrap: 'nowrap' }"> [zmiana dzisiaj]</span>
                    </div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            display: 'flex',
                            flexDirection: 'row',
                            color: getColor(data.rating, lowest('rating'), highest('rating')),
                        }"
                    >
                        <div :style="{ width: '110px', textAlign: 'end', marginRight: '0.3rem' }">
                            {{ data.rating }}
                        </div>
                        <div>
                            <span
                                v-if="getRankingChangeToday(data.username) != 0"
                                :style="{ color: getRankingChangeToday(data.username) >= 0 ? 'orange' : 'red' }"
                            >
                                {{
                                    '[' +
                                    (getRankingChangeToday(data.username) > 0 ? '+' : '') +
                                    getRankingChangeToday(data.username) +
                                    ']'
                                }}
                            </span>
                        </div>
                    </div>
                </template>
            </Column>
            <Column field="tacticsRating" sortable style="max-width: 10rem">
                <template #header>
                    <div :style="{ textAlign: 'center', width: '100%' }">Ranking w Zadaniach</div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            color: getColor(data.tacticsRating ?? 0, lowest('tacticsRating'), highest('tacticsRating')),
                            textAlign: 'center',
                        }"
                    >
                        {{ data.tacticsRating ?? '-' }}
                    </div>
                </template>
            </Column>
            <Column field="playedMatches" sortable>
                <template #header>
                    <div :style="{ textAlign: 'center', width: '100%' }">Zagrane rapidy</div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            color: getColor(data.playedMatches ?? 0, lowest('playedMatches'), 800),
                            textAlign: 'center',
                        }"
                    >
                        {{ data.playedMatches }}
                    </div>
                </template>
            </Column>
            <Column field="tacticsDone" sortable>
                <template #header>
                    <div :style="{ textAlign: 'center', width: '100%' }">Zrobione zadanka</div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            color: getColor(data.tacticsDone ?? 0, lowest('tacticsDone'), 1500),
                            textAlign: 'center',
                        }"
                    >
                        {{ data.tacticsDone ?? 0 }}
                    </div>
                </template>
            </Column>
            <Column field="timeSpentOnTatics" sortable style="max-width: 12rem">
                <template #header>
                    <div :style="{ textAlign: 'center', width: '100%' }">Czas spędzony na zadaniach[HH:MM]</div>
                </template>
                <template #body="{ data }">
                    <div
                        :style="{
                            color: getColor(
                                data.timeSpentOnTatics ?? 0,
                                lowest('timeSpentOnTatics'),
                                highest('timeSpentOnTatics'),
                            ),
                            textAlign: 'center',
                        }"
                    >
                        {{
                            Math.floor((data.timeSpentOnTatics ?? 0) / 3600)
                                .toString()
                                .padStart(2, '0') +
                            ':' +
                            Math.floor(((data.timeSpentOnTatics ?? 0) / 60) % 60)
                                .toString()
                                .padStart(2, '0')
                        }}
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import type { ChessStats } from '@/models/models'
import { useMainStore } from '../stores/mainStore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { PlayerAccounts, playerMappings } from '@/common/consts'
import { isDarkMode } from '@/common/helpers'
import TwitchIcon from '../assets/icons/twitch-icon.png'
import KickIcon from '../assets/icons/kick.png'
import ChesscomIcon from '../assets/icons/chesscom.png'

const store = useMainStore()

const getRankingChangeToday = (username: string): number => {
    const data = store.playerEloGainsAndGames.find((player) => player.username === username)
    if (data) {
        return data.eloGains
    }
    return 0
}

const getColor = (value: number, min: number, max: number) => {
    const isDark = isDarkMode()
    const ratio = (value - min) / (max - min)
    const r = Math.round(255 * (1 - ratio)) // red
    //const g = Math.round(255 * ratio) // green
    if (isDark) {
        return `rgb(${r}, ${255}, ${r})`
    }
    return `rgb(${0}, ${255 - r}, ${0})`
}

const highest = <T extends keyof ChessStats>(fieldName: T): number => {
    return Math.max(...store.players.map((player) => player[fieldName]).filter((value) => typeof value === 'number'))
}
const lowest = <T extends keyof ChessStats>(fieldName: T): number => {
    return Math.min(...store.players.map((player) => player[fieldName]).filter((value) => typeof value === 'number'))
}
</script>

<style scoped>
.datatable {
    border-radius: 12px;
    overflow: hidden;
    line-height: 1.6;
    font-size: 16px;
    z-index: 10;
    box-shadow:
        0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.hoverable:hover {
    filter: saturate(4);
    filter: contrast(1.2);
}
.hoverable {
    filter: contrast(0.7);
    cursor: pointer;
}
</style>
