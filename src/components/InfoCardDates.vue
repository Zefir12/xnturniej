<template>
    <div
        :style="{
            backgroundColor: isDarkMode() ? '#18181b' : '#fff',
        }"
        class="main-container"
    >
        <div class="inside-container">
            <span :style="{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', position: 'relative' }"
                >Progres (Rapidy)
            </span>
            <div :style="{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'space-between' }">
                <MultiSelect
                    v-model="selectedPlayers"
                    display="chip"
                    :style="{ flexGrow: 1 }"
                    :options="getAllPlayers()"
                    optionLabel="name"
                    filter
                    placeholder="Wybierz graczy"
                    class="w-full md:w-80 multi-selector"
                />
                <FloatLabel>
                    <DatePicker
                        :style="{ width: '150px' }"
                        v-model="date"
                        inputId="over_label"
                        showIcon
                        iconDisplay="input"
                    />
                    <label for="over_label">Zakres czasu</label>
                </FloatLabel>
            </div>

            <div class="chart-wrapper">
                <EloChart :datasets="eloDatasets" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { isDarkMode } from '@/common/helpers'
import type { ChartOptions } from 'chart.js'
import { onMounted, ref, watch } from 'vue'
import EloChart from './EloChart.vue'
import { PlayerAccounts, playerMappings } from '@/common/consts'
import MultiSelect from 'primevue/multiselect'
import { getAllPlayers } from '@/common/helpers'
import DatePicker from 'primevue/datepicker'
import { FloatLabel } from 'primevue'

const eloDatasets = ref([])
const selectedPlayers = ref<
    {
        name: string
        avatar: string
        twitch: string
        kick: undefined
        uuid: string
        charColor: string
    }[]
>(getAllPlayers())
const playerData = ref<any[]>([])
const date = ref(new Date('2025-02-15'))

const fetchEloData = async (playerUuid: string, date: string) => {
    try {
        const requestBody = {
            date: date, // Pass the date (ISO string format)
            uuid: playerUuid, // Pass the player UUID
        }
        let url = 'http://localhost:3000'
        if (import.meta.env.VITE_ENV == 'prod') {
            url = 'https://xnturniej.online'
        }
        const response = await fetch(url + '/getPlayerEloProgression', {
            method: 'POST', // POST method to send data to the server
            headers: {
                'Content-Type': 'application/json', // Specify content type as JSON
            },
            body: JSON.stringify(requestBody), // Convert the request body into a JSON string
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Failed to fetch Elo data:', error)
    }
}

watch(selectedPlayers, () => {
    eloDatasets.value = playerData.value.filter((x) => selectedPlayers.value.map((y) => y.name).includes(x.label)) ?? []
})

watch(date, async () => {
    const promises = Object.values(PlayerAccounts).map(async (name) => {
        const res = await fetchEloData(
            playerMappings[name as PlayerAccounts].uuid,
            date.value.toISOString().split('T')[0],
        )

        return {
            label: playerMappings[name as PlayerAccounts].name,
            backgroundColor: 'rgba(26, 21, 1, 0.2)',
            borderColor: playerMappings[name as PlayerAccounts].charColor,
            borderWidth: 2,
            pointBackgroundColor: 'rgba(21, 21, 1, 1)',
            tension: 0.5,
            cubicInterpolationMode: 'monotone',
            avatar: playerMappings[name as PlayerAccounts].avatar,
            data: res.map((x: { elo: number; date: number }) => ({ elo: x.elo, date: new Date(x.date * 1000) })),
        }
    })
    const result = [...(await Promise.all(promises))]
    playerData.value = result
    eloDatasets.value = result.filter((x) => selectedPlayers.value.map((y) => y.name).includes(x.label)) ?? []
})

function getRandomRGBA() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgba(${r}, ${g}, ${b}, 1)` // Full opacity (alpha = 1)
}

onMounted(async () => {
    const promises = Object.values(PlayerAccounts).map(async (name) => {
        const res = await fetchEloData(playerMappings[name as PlayerAccounts].uuid, '2025-02-15')

        return {
            label: playerMappings[name as PlayerAccounts].name,
            backgroundColor: 'rgba(26, 21, 1, 0.2)',
            borderColor: playerMappings[name as PlayerAccounts].charColor,
            borderWidth: 2,
            pointBackgroundColor: 'rgba(21, 21, 1, 1)',
            tension: 0.5,
            cubicInterpolationMode: 'monotone',
            avatar: playerMappings[name as PlayerAccounts].avatar,
            data: res.map((x: { elo: number; date: number }) => ({ elo: x.elo, date: new Date(x.date * 1000) })),
        }
    })
    const result = [...(await Promise.all(promises))]
    playerData.value = result
    eloDatasets.value = result
})
</script>

<style scoped>
.main-container {
    position: relative;
    display: flex;
    flex-grow: 1;
    height: 100vh;
    flex-direction: column;
    align-items: stretch;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.4s ease;
}

.inside-container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    align-items: stretch;
    flex-grow: 1;
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

.multi-selector {
    max-width: calc(100% - 150px);
}

@media (max-width: 868px) {
    .multi-selector {
        max-width: 200px;
    }
}

.chart-wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
</style>
