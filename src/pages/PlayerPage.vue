<template>
    <div
        :style="{
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100vh',
        }"
    >
        <div class="main-column">
            <div :style="{ width: '100%', margin: '20px' }">
                <div
                    class="horizontal-container"
                    :style="{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: '4px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        backgroundColor: 'transparent',
                    }"
                >
                    <h2 :style="{ marginTop: '0px' }">Dane zawodnika</h2>
                    <div :style="{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'flex-start' }">
                        <div :class="activePage == 0 ? 'filled-button' : 'styled-button'" @click="activePage = 0">
                            Statystyki
                        </div>
                        <div :class="activePage == 1 ? 'filled-button' : 'styled-button'" @click="activePage = 1">
                            Data
                        </div>
                        <div :class="activePage == 2 ? 'filled-button' : 'styled-button'" @click="activePage = 2">
                            Info
                        </div>
                    </div>
                </div>
                <div class="horizontal-container">
                    <div
                        :style="{
                            paddingLeft: '30px',
                            paddingTop: '20px',
                            fontWeight: '700',
                        }"
                    >
                        Najtrudniejsze match'upy:
                    </div>
                    <div
                        :style="{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '130px',
                            margin: '20px',
                            width: '1000px',
                            overflowX: 'scroll',
                        }"
                    >
                        <div
                            v-for="item in winrates"
                            :style="{
                                height: '100%',
                                backgroundColor: 'transparent',
                                width: '120px',
                                minWidth: '120px',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                fontSize: '12px',
                            }"
                            :key="item.playerUuid"
                        >
                            <img
                                :style="{ width: '64px', height: '64px', marginBottom: '0px' }"
                                :src="getPlayerByUuid(item.playerUuid ?? '')?.avatar"
                            />
                            <span>Winrate: {{ item.winrate }}%</span>
                            <span>{{ item.totalGames }} partii</span>
                        </div>
                    </div>
                </div>
            </div>
            <div :style="{ width: '500px', margin: '20px', marginLeft: '0px' }">
                <div class="vertical-container">
                    <div :style="{ display: 'flex' }">
                        <img
                            :style="{ width: '120px', height: '120px', marginBottom: '-4px' }"
                            :src="getPlayerByNiceName(props.playerName ?? '')?.avatar"
                        />
                        <div :style="{ width: '100%', alignItems: 'center', textAlign: 'center' }">
                            <h3>{{ getPlayerByNiceName(props.playerName ?? '')?.name }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getPlayerByNiceName, getPlayerByUuid } from '@/common/helpers'

const activePage = ref(0)
const winrates = ref<{ playerUuid: string; winrate: number; totalGames: number }[]>([])

const props = defineProps({
    playerName: String,
})

const fetchPlayerWinrates = async (playerUuid: string) => {
    try {
        const requestBody = {
            uuid: playerUuid,
        }
        let url = 'http://localhost:3000'
        if (import.meta.env.VITE_ENV == 'prod') {
            url = 'https://xnturniej.online'
        }
        const response = await fetch(url + '/playerWinrateVsOtherPlayers', {
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

onBeforeMount(async () => {
    const response = await fetchPlayerWinrates(getPlayerByNiceName(props.playerName ?? '')?.uuid ?? '')
    winrates.value = response.sort((a, b) => a.winrate - b.winrate)
})
</script>

<style scoped>
.styled-button {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    border-radius: 20px;
    border-style: solid;
    border-color: rgb(68, 68, 68);
    border-width: 1px;
    padding: 10px;
    padding-left: 16px;
    padding-right: 16px;
    cursor: pointer;
}

.filled-button {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    border-radius: 20px;
    border-style: solid;
    border-color: rgb(68, 68, 68);
    background-color: chocolate;
    border-width: 1px;
    padding: 10px;
    padding-left: 16px;
    padding-right: 16px;
    cursor: pointer;
}

.main-column {
    display: flex;
    margin: 20px;
    flex-direction: row;
    width: 1400px;
    background-color: #18181b;
    border-radius: 20px;
    overflow: hidden;
}

.vertical-container {
    width: 100%;
    overflow: hidden;
    border-radius: 16px;
    min-height: 64px;
    background-color: #2b2b3183;
}

.horizontal-container {
    width: 100%;
    overflow: hidden;
    border-radius: 16px;
    min-height: 64px;
    background-color: #2b2b3183;
}
</style>
