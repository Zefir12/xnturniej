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

            <div class="chart-wrapper">
                <EloChart :datasets="eloDatasets" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { isDarkMode } from '@/common/helpers'
import type { ChartOptions } from 'chart.js'
import { onMounted, ref } from 'vue'
import EloChart from './EloChart.vue'
import { PlayerAccounts, playerMappings } from '@/common/consts'

// const chartData = ref({
//     type: 'line' as const,
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [
//         {
//             label: 'Dataset One',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 2,
//             pointBackgroundColor: 'rgba(75, 192, 192, 1)',
//             tension: 0.4, // This enables cubic interpolation
//             data: [65, 59, 80, 81, 56, 55],
//             avatar: zwierzak,
//         },
//         {
//             label: 'Dataset Two',
//             backgroundColor: 'rgba(54, 162, 235, 0.2)',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 2,
//             pointBackgroundColor: 'rgba(54, 162, 235, 1)',
//             tension: 0.4,
//             data: [28, 48, 40, 19, 86, 27],
//             avatar: overpow,
//         },
//         {
//             label: 'Dataset Three',
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 2,
//             pointBackgroundColor: 'rgba(255, 99, 132, 1)',
//             tension: 0.4,
//             data: [33, 65, 58, 45, 71, 90],
//             avatar: kubon,
//         },
//         {
//             label: 'Dataset Four',
//             backgroundColor: 'rgba(255, 206, 86, 0.2)',
//             borderColor: 'rgba(255, 206, 86, 1)',
//             borderWidth: 2,
//             pointBackgroundColor: 'rgba(255, 206, 86, 1)',
//             tension: 0.4,
//             data: [45, 25, 62, 56, 48, 70],
//             avatar: demonz,
//         },
//         {
//             label: 'Dataset Five',
//             backgroundColor: 'rgba(153, 102, 255, 0.2)',
//             borderColor: 'rgba(153, 102, 255, 1)',
//             borderWidth: 2,
//             pointBackgroundColor: 'rgba(153, 102, 255, 1)',
//             tension: 0.4,
//             data: [12, 34, 67, 23, 56, 78],
//             avatar: bladii,
//         },
//     ],
// })

// const chartOptions = ref<ChartOptions>({
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//         y: {
//             beginAtZero: true,
//         },
//     },
//     elements: {
//         point: {
//             radius: 4,
//             hoverRadius: 6,
//         },
//         line: {
//             tension: 0.4,
//         },
//     },
//     interaction: {
//         intersect: false,
//         mode: 'index',
//     },
// })

const eloDatasets = ref([])

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

function getRandomRGBA() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgba(${r}, ${g}, ${b}, 1)` // Full opacity (alpha = 1)
}

onMounted(async () => {
    const a = []
    for (const name of Object.values(PlayerAccounts)) {
        const res = await fetchEloData(playerMappings[name as PlayerAccounts].uuid, '2025-02-11')
        a.push({
            label: playerMappings[name as PlayerAccounts].name,
            backgroundColor: 'rgba(26, 21, 1, 0.2)',
            borderColor: playerMappings[name as PlayerAccounts].charColor,
            borderWidth: 2,
            pointBackgroundColor: 'rgba(21, 21, 1, 1)',
            tension: 0.4,
            avatar: playerMappings[name as PlayerAccounts].avatar,
            data: res.map((x: { elo: number; date: number }) => ({ elo: x.elo, date: new Date(x.date * 1000) })),
        })
    }
    eloDatasets.value = a
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

.chart-wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
</style>
