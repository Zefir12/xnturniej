<template>
    <div class="datatable">
        <DataTable
            :value="store.players"
            :defaultSortOrder="-1"
            :sortField="'rating'"
            :sortOrder="-1"
            tableStyle="min-width: 50rem"
        >
            <Column field="username" header="Zawodnik" :style="{ width: '12rem' }">
                <template #body="{ data }">
                    <b :style="{ cursor: 'pointer' }">{{ data.username }}</b>
                </template>
            </Column>
            <Column field="rating" header="Ranking Rapidów" sortable style="width: 3rem">
                <template #body="{ data }">
                    <div
                        :style="{
                            color: getColor(data.rating, lowest('rating'), highest('rating')),
                            textAlign: 'center',
                        }"
                    >
                        {{ data.rating }}
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
                            color: getColor(data.playedMatches ?? 0, lowest('playedMatches'), highest('playedMatches')),
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
                            color: getColor(data.tacticsDone ?? 0, lowest('tacticsDone'), highest('tacticsDone')),
                            textAlign: 'center',
                        }"
                    >
                        {{ data.tacticsDone ?? 0 }}
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

const store = useMainStore()

const getColor = (value: number, min: number, max: number) => {
    const ratio = (value - min) / (max - min)
    const r = Math.round(255 * (1 - ratio)) // red
    //const g = Math.round(255 * ratio) // green
    return `rgb(${r}, ${255}, ${r})`
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
}
</style>
