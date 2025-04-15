<template>
    <div class="page-container">
        <div class="user-container">
            <img :style="{ width: '150px' }" :src="pickemlogo" />
            <span v-if="userStore.pickemTwitchUser == null" :style="{ marginRight: '10px' }"
                >Niepodłączone konto:
            </span>
            <div :style="{ display: 'flex', alignItems: 'center', gap: '10px' }" v-else>
                <img :style="{ width: '46px', height: '46px' }" :src="TwitchIcon" />
                <div>
                    <span>Użytkownik: </span>
                    <div
                        :style="{
                            backgroundColor: 'transparent',
                            padding: '0px 0px',
                            borderRadius: '4px',
                            fontWeight: '800',
                        }"
                    >
                        {{ userStore.pickemTwitchUser.displayName }}
                    </div>
                </div>
            </div>

            <a
                v-if="userStore.pickemTwitchUser == null"
                :href="`https://id.twitch.tv/oauth2/authorize?client_id=rria64c2ylpvlo1iazn2gnt8mkw4zc&redirect_uri=${callback}/twitch/callback&response_type=code&scope=user:read:email`"
            >
                <div class="twitch-button">
                    <span :style="{ fontWeight: 'bold', textDecoration: 'none' }">Połącz z kontem Twitch</span>
                </div>
            </a>
        </div>
        <div class="data-container">
            <Tabs :style="{ width: '100vw', backgroundColor: 'transparent' }" v-model:value="panelTab">
                <TabList :style="{ justifyContent: 'center' }">
                    <Tab value="0" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Informacje</span>
                    </Tab>
                    <Tab value="1" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Faza grupowa</span>
                    </Tab>
                    <Tab :disabled="true" value="2" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Drabinka</span>
                    </Tab>
                    <Tab value="3" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Kryształowa Kula</span>
                    </Tab>
                    <Tab disabled value="4" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Ranking Twitcha</span>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0" as="p" class="m-0">
                        <div :style="{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }">
                            <div :style="{ maxWidth: '800px', margin: 'auto' }">
                                <h2>💡 Czym jest Pick’em Challenge?</h2>
                                <p>
                                    To Twój moment, żeby pokazać, że masz szachową intuicję i znasz zawodników jak
                                    własną kieszeń. Wybierasz w jaki sposób według Ciebie potoczy sie turniej oraz co
                                    sie na nim wydarzy - i zbierasz punkty za trafne typy.
                                </p>
                                <p>
                                    Proste? No własnie nie, ale być może to Ty będziesz TOP 1 jasnowidzem na polskim
                                    Twitchu.
                                </p>

                                <h2>🎯 Jak to działa?</h2>
                                Żeby grać authentykujesz sie swoim kontem twitch, potrzebne aby Wbijasz na panele
                                pick’em używając zakładek powyżej. Typujesz zawodników, którzy Twoim zdaniem dojdą
                                najdalej. Oglądasz transmisję z turnieju, zgarniasz punkty i sprawdzasz, czy jesteś
                                szefem predykcji czy tylko randomem z czatu
                                <img
                                    :style="{ height: '20px' }"
                                    src="https://cdn.7tv.app/emote/01GPQJ1NKR000BGP5H3DVAPXAN/1x.avif"
                                />
                                <h2>🏆 Co jest do wygrania?</h2>
                                <p>Chwała i sława z bycia topką rankingu Twitcha!</p>
                                <p :style="{ fontSize: '12px' }">
                                    To sie jeszcze może zmienić. (Może dorzuce 20 zł psc, może XN dorzuci szachowy
                                    kursik czy coś, kto wie 👀)
                                </p>
                            </div>
                            <Button
                                @click="panelTab = '1'"
                                :style="{
                                    padding: '12px',
                                    fontWeight: '800',
                                    backgroundColor: '#6441a5',
                                    width: '200px',
                                    marginTop: '20px',
                                }"
                                >{{ 'Zacznij typować'.toUpperCase() }}</Button
                            >
                        </div>
                    </TabPanel>
                    <TabPanel value="1" as="p" class="m-0">
                        <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }">
                            <div
                                :style="{
                                    paddingLeft: '0px',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '20px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }"
                            >
                                <GroupContainer group="a" />
                                <GroupContainer group="b" />
                                <GroupContainer group="c" />
                                <GroupContainer group="d" />
                            </div>
                            <div :style="{ maxWidth: '800px' }">
                                <h2>📜 ZASADY – FAZA GRUPOWA PICK’EM CHALLENGE</h2>
                                <p>Okej, konkrety – jak działa punktacja w fazie grupowej?</p>
                                <p>
                                    Jeżeli trafisz prawidłowo czy zawodniku wychodzi z grupy, czy trafia do drabinki dla
                                    sprytnych inaczej: +1pkt✅ Jeżeli trafisz dokładne miejsce które zawodnik zajmie w
                                    grupie: +1pkt✅
                                </p>

                                W sumie do zgarnięcia za fazę grupową są aż 32 punkty. Aby wziąć udział w rankingu
                                trzeba podłączyć konto Twitch na górze
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="2" as="p" class="m-0">
                        <OrganizationChart
                            v-model:selectionKeys="selection"
                            :value="data"
                            @update:selectionKeys="(x) => clickedNode(x)"
                            selectionMode="multiple"
                        >
                            <template #default="slotProps">
                                <div>
                                    <span>{{ slotProps.node.data.name }}</span>
                                </div>
                            </template>
                        </OrganizationChart>
                    </TabPanel>

                    <TabPanel value="3" as="p" class="m-0">
                        <div
                            :style="{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }"
                        >
                            <div
                                :style="{
                                    maxWidth: '1200px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: '8px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }"
                            >
                                <CrystallBallItem>
                                    Niewidomi - którzy zawodnicy według ciebie podwalą hetmana
                                </CrystallBallItem>
                                <CrystallBallItem
                                    >Speedrunner - obstaw zawodnik który zużyje najmniej czasu śrendio podczas swoich
                                    aprtii</CrystallBallItem
                                >
                                <CrystallBallItem
                                    >Słaby awans - ile pinków zostanie zaminionych w wieżę po osiągnięciu linii
                                    końcowej?</CrystallBallItem
                                >
                                <CrystallBallItem
                                    >Blitzkrieg - ile ruchów potrwa najkrótsza partai turnieju?</CrystallBallItem
                                >
                                <CrystallBallItem
                                    >Kolory - na przestrzeni całęgo turnieju w sumie: - czy więcej partii wygrają białe,
                                    czy może czarne?</CrystallBallItem
                                >
                                <CrystallBallItem>Do wymyślenia...</CrystallBallItem>
                                <CrystallBallItem>Do wymyślenia...</CrystallBallItem>
                                <CrystallBallItem>Do wymyślenia...</CrystallBallItem>
                                <CrystallBallItem>Do wymyślenia...</CrystallBallItem>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel disabled value="4" as="p" class="m-0"> </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import OrganizationChart from 'primevue/organizationchart'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import pickemlogo from '../assets/icons/pickemlogo.png'
import GroupContainer from '@/components/PickEmComponents/GroupContainer.vue'
import CrystallBallItem from '@/components/PickEmComponents/CrystallBallItem.vue'
import TwitchIcon from '@/assets/icons/twitch-icon.png'
import { Button } from 'primevue'

const userStore = useUserStore()
const panelTab = ref('0')
const lastSelect = ref({})
const callback = import.meta.env.VITE_ENV != 'prod' ? 'https://xnturniej.info' : 'http://localhost:5137'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clickedNode = (x: any) => {
    if (lastSelect.value) {
        const addedKeys = Object.keys(x).filter((key) => !lastSelect.value[key])
        const removedKeys = Object.keys(lastSelect.value).filter((key) => !x[key])
        const changedKeys = [...addedKeys, ...removedKeys]
        console.log('Changed keys:', changedKeys[0])
        lastSelect.value = x
    } else {
        lastSelect.value = x
    }
}

const data = ref({
    key: '0',
    data: {
        name: '',
    },
    children: [
        {
            key: '0_0',
            data: {
                name: '',
            },
            children: [
                {
                    key: '0_0_0',
                    data: {
                        name: 'Anna Fali',
                    },
                },
                {
                    key: '0_0_1',
                    data: {
                        name: 'Anna Fali',
                    },
                },
            ],
        },
        {
            key: '0_1',
            data: {
                name: '',
            },
            children: [
                {
                    key: '0_1_0',
                    data: {
                        name: '',
                    },
                },
                {
                    key: '0_1_1',
                    data: {
                        name: '',
                    },
                },
            ],
        },
    ],
})
const selection = ref({})
</script>

<style scped>
.data-container {
    margin-top: -30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.user-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.twitch-button {
    background-color: #6441a5;
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}
</style>
