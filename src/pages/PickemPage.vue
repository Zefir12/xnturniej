<template>
    <div class="page-container" :style="{ fontFamily: 'Source Sans Pro' }">
        <div class="user-container">
            <img
                :style="{
                    height: '130px',
                    marginTop: '15px',
                    marginBottom: '30px',
                    marginRight: '30px',
                }"
                :src="SzachMatLogo"
            />

            <div
                :style="{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                    marginLeft: '-30px',
                }"
                v-if="userStore.pickemTwitchUser != null"
            >
                <img :style="{ width: '46px', height: '46px' }" :src="TwitchIcon" />
                <div>
                    <span>Zalogowany jako: </span>
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
                    <div>🏆 0 punktów</div>
                </div>
            </div>

            <a
                :style="{ textDecoration: 'none', marginBottom: '20px' }"
                v-if="userStore.pickemTwitchUser == null"
                :href="`https://id.twitch.tv/oauth2/authorize?client_id=rria64c2ylpvlo1iazn2gnt8mkw4zc&redirect_uri=${callback}/twitch/callback&response_type=code&scope=user:read:email`"
            >
                <div class="twitch-button">
                    <div :style="{ fontWeight: 'bold' }">Połącz z kontem Twitch</div>
                </div>
            </a>
        </div>
        <div class="data-container">
            <Tabs :style="{ width: '100%', backgroundColor: 'transparent' }" v-model:value="panelTab">
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
                    <Tab value="4" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Ranking Twitcha</span>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0" as="p" class="m-0">
                        <div
                            :style="{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: '#FAF9F6',
                            }"
                        >
                            <div :style="{ maxWidth: '800px', margin: 'auto' }">
                                <h2>Czym jest Pick’em Challenge?</h2>
                                <p>
                                    To Twój moment, żeby pokazać, że masz szachową intuicję i znasz zawodników jak
                                    własną kieszeń. Wybierasz w jaki sposób według Ciebie potoczy sie turniej oraz co
                                    sie na nim wydarzy - i zbierasz punkty za trafne typy.
                                </p>
                                <p>
                                    Proste? No własnie nie, ale być może to Ty będziesz TOP 1 jasnowidzem na polskim
                                    Twitchu.
                                </p>

                                <h2>Jak to działa?</h2>
                                Wbijasz na panele pick’em używając zakładek powyżej. Typujesz zawodników, którzy Twoim
                                zdaniem dojdą najdalej. Oglądasz transmisję z turnieju, zgarniasz punkty i sprawdzasz,
                                czy jesteś szefem predykcji czy tylko randomem z czatu
                                <img
                                    :style="{ height: '20px' }"
                                    src="https://cdn.7tv.app/emote/01GPQJ1NKR000BGP5H3DVAPXAN/1x.avif"
                                />
                                <p>
                                    Żeby być w rankingu i mieć zliczane punkty musisz zalogować sie twitchem, ale można
                                    też typować samemu dla siebie anonimowo
                                </p>
                                <h2>🏆 Co jest do wygrania?</h2>
                                <p>
                                    Chwała i sława z bycia topką rankingu Twitcha! A dla trzech najlepiej typujących -
                                    dowolny kurs z ostre-debiuty.pl
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
                        <div
                            :style="{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '40px',
                                color: '#FAF9F6',
                                fontFamily: 'Source Sans Pro',
                            }"
                        >
                            <Toast />
                            <CountDownTimer
                                class="no-select"
                                rectColor="#18181b"
                                :style="{ marginTop: '-20px' }"
                                text="Grupy będą losowane za: "
                                :date="new Date('2025-04-23T16:00:00')"
                            />
                            <div
                                class="no-select"
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
                            <div :style="{ display: 'flex', gap: '10px' }">
                                <StyledButton :disabled="!changes" @click="saveGroups">Zapisz zmiany</StyledButton>
                            </div>
                            <div :style="{ maxWidth: '800px' }">
                                <h2>📜 ZASADY – FAZA GRUPOWA PICK’EM CHALLENGE</h2>
                                <p>Okej, jak działa punktacja w fazie grupowej?</p>
                                <p>
                                    Jeżeli trafisz prawidłowo czy zawodnik wychodzi z grupy, czy trafia do drabinki
                                    pocieszenia zdobywasz: <PointsBlock points="1" />
                                </p>
                                <p>
                                    Dodatkowo jeżeli trafisz dokładne miejsce które zawodnik zajmie w grupie:
                                    <PointsBlock points="+2" />
                                </p>

                                W sumie do zgarnięcia za fazę grupową jest aż 48 punktów. Aby wziąć udział w rankingu
                                online trzeba być zalogowanym
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
                        <CountDownTimer
                            class="no-select"
                            rectColor="#18181b"
                            :style="{ marginTop: '-4px', marginBottom: '30px' }"
                            text="Obstawianie wystartuje za: "
                            :date="new Date('2025-04-23T16:00:00')"
                        />
                        <div
                            class="no-select"
                            :style="{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                color: '#FAF9F6',
                            }"
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
                                    textAlign: 'center',
                                }"
                            >
                                <CrystallBallItem title="Botez Gambit" :image="BlindManLogo">
                                    <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                        Którzy zawodnicy według ciebie podwalą hetmana?
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem title="Speedrunner" :image="TimerLogo"
                                    ><div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                        Który zawodnik zużyje średnio najmniej czasu podczas swoich partii
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem title="Słaby awans" :image="EvolveLogo"
                                    ><div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '40px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Ile pionków zostanie zamienionych w w coś innego niż hetman po osiągnięciu
                                            linii końcowej?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <InputNumber
                                                :disabled="true"
                                                fluid
                                                size="small"
                                                :style="{ width: '60px' }"
                                            />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem title="Blitzkrieg" :image="BlindManLogo"
                                    ><div
                                        :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }"
                                    ></div>
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '60px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Ile ruchów potrwa najkrótsza partia w turnieju?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <InputNumber
                                                :disabled="true"
                                                fluid
                                                size="small"
                                                :style="{ width: '60px' }"
                                            />
                                        </div></div
                                ></CrystallBallItem>
                                <CrystallBallItem title="Dwie armie" :image="ArmyLogo"
                                    ><div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                        Na przestrzeni całego turnieju w sumie: - czy więcej partii wygrają białe, czy
                                        może czarne?
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem title="Vox Populi" :image="BlindManLogo">
                                    <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                        Kto będzie obstawiany jako zwycięzca całego turnieju przez największą ilość
                                        osób?
                                    </div></CrystallBallItem
                                >
                                <CrystallBallItem title="Wypadek przy pracy..." :image="BlindManLogo"
                                    ><div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                        Ile wydarzy się patów podczas turnieju?
                                    </div></CrystallBallItem
                                >
                                <CrystallBallItem title="Początki" :image="BlindManLogo"
                                    ><div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                        Czy E4 będzie zagrane więcej razy jako pierwszy ruch niż wszystkie pozostałe
                                        opcje razem wzięte?
                                    </div></CrystallBallItem
                                >
                                <CrystallBallItem title="Do ostatniej kropli krwi" :image="ArmyLogo">
                                    <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                        W której z grup wydarzy się najwięcej dogrywek?
                                    </div>
                                </CrystallBallItem>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="4" as="p" class="m-0">
                        <div
                            :style="{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: '#FAF9F6',
                            }"
                        >
                            <DataTable
                                :value="pickemPlayers"
                                scrollable
                                paginator
                                :rows="20"
                                :rowsPerPageOptions="[5, 10, 20, 50, 100]"
                                tableStyle="min-width: 50rem max-width: 100rem"
                            >
                                <Column :style="{ width: '10em' }" header="Miejsce w rankingu">
                                    <template #body="{ data }"
                                        ><div
                                            :style="{
                                                height: '2rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginLeft: '1rem',
                                            }"
                                        >
                                            {{ pickemPlayers.findIndex((x) => x === data) + 1 }}
                                        </div></template
                                    >
                                </Column>
                                <Column :style="{ width: '10em', backgroundColor: 'transparent' }" header="Nick">
                                    <template #body="{ data }">{{ data.name }}</template>
                                </Column>
                                <Column header="Punkty fazy grupowej"
                                    ><template #body="">{{ 0 }}</template></Column
                                >
                                <Column header="Punkty w drabince"
                                    ><template #body="">{{ 0 }}</template></Column
                                >
                                <Column header="Punkty za kryształową kule"
                                    ><template #body="">{{ 0 }}</template></Column
                                >
                                <Column header="Punkty razem"
                                    ><template #body="">{{ 0 }}</template></Column
                                >
                            </DataTable>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { onBeforeMount, ref, watch } from 'vue'
import OrganizationChart from 'primevue/organizationchart'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import GroupContainer from '@/components/PickEmComponents/GroupContainer.vue'
import CrystallBallItem from '@/components/PickEmComponents/CrystallBallItem.vue'
import TwitchIcon from '@/assets/icons/twitch-icon.png'
import { Button } from 'primevue'
import BlindManLogo from '@/assets/icons/pickem/blindmanlogo.png'
import TimerLogo from '@/assets/icons/pickem/timerb.png'
import EvolveLogo from '@/assets/icons/pickem/evolve.png'
import ArmyLogo from '@/assets/icons/pickem/army.png'
import SzachMatLogo from '@/assets/icons/szachmatlogo.png'
import { DataTable, Column } from 'primevue'
import PointsBlock from '@/components/FormatComponents/PointsBlock.vue'
import api from '@/common/api'
import CountDownTimer from '@/components/CountDownTimer.vue'
import { InputNumber } from 'primevue'
import StyledButton from '@/components/StyledButton.vue'
import { usePickemStore } from '@/stores/pickemStore'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { getRandomSuccessMessage } from '@/common/helpers'

const toast = useToast()

const userStore = useUserStore()
const panelTab = ref(localStorage.getItem('pickemTab') || '0')
const lastSelect = ref<{ [key: string]: unknown }>({})
const callback = import.meta.env.VITE_ENV == 'prod' ? 'https://xnturniej.info' : 'http://localhost:5173'
const pickemStore = usePickemStore()
const changes = ref(false)
const loading = ref(true)

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

function haveGroupsChanged() {
    const groupLetters = ['a', 'b', 'c', 'd']
    const defaultValue = '["1","2","3","4"]'

    const b = groupLetters.some((group) => {
        const original = localStorage.getItem(`group-${group}`) ?? defaultValue
        const temp = localStorage.getItem(`temp-group-${group}`) ?? defaultValue
        return original !== temp
    })
    changes.value = b
}

watch(
    () => pickemStore.changesCounter,
    () => {
        haveGroupsChanged()
    },
)

watch(panelTab, (newVal) => {
    localStorage.setItem('pickemTab', newVal)
})

const saveGroups = async () => {
    loading.value = true
    const a = localStorage.getItem(`temp-group-a`) ?? '["1","2","3","4"]'
    const b = localStorage.getItem(`temp-group-b`) ?? '["1","2","3","4"]'
    const c = localStorage.getItem(`temp-group-c`) ?? '["1","2","3","4"]'
    const d = localStorage.getItem(`temp-group-d`) ?? '["1","2","3","4"]'
    localStorage.setItem(`group-a`, a)
    localStorage.setItem(`group-b`, b)
    localStorage.setItem(`group-c`, c)
    localStorage.setItem(`group-d`, d)
    if (localStorage.getItem('pickemTwitchUser') == null) {
        toast.add({
            severity: 'error',
            summary: 'Błąd',
            group: 'br',
            detail: 'Aby brac udział w rankingu trzeba byc zalogowanym',
            life: 3000,
        })
        return
    }
    const result = await api.post('/pickem/choosegroups', {
        id: JSON.parse(localStorage.getItem('pickemTwitchUser') ?? '{}')._id,
        groups: `${a}-${b}-${c}-${d}`,
    })
    if (!result) {
        toast.add({
            severity: 'error',
            summary: 'Błąd',
            group: 'br',
            detail: 'Wystąpił błąd podczas zapisywania zmian',
            life: 3000,
        })
        return
    }
    pickemStore.addChangesCounter()
    loading.value = false
    toast.add({
        severity: 'success',
        summary: 'Zapisano zmiany',
        group: 'br',
        detail: getRandomSuccessMessage(),
        life: 3000,
    })
}

const pickemPlayers = ref<{ name: string }[]>([])

onBeforeMount(async () => {
    localStorage.setItem(`temp-group-a`, localStorage.getItem(`group-a`) ?? '["1","2","3","4"]')
    localStorage.setItem(`temp-group-b`, localStorage.getItem(`group-b`) ?? '["1","2","3","4"]')
    localStorage.setItem(`temp-group-c`, localStorage.getItem(`group-c`) ?? '["1","2","3","4"]')
    localStorage.setItem(`temp-group-d`, localStorage.getItem(`group-d`) ?? '["1","2","3","4"]')

    const groups = await api.get('/pickem/getgroups')
    pickemStore.setGroup(groups.data)

    const response = await api.get('/pickemranking')
    pickemPlayers.value = response.data.map((x: string) => ({ name: x }))
})

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

<style scoped>
.no-select {
    user-select: none;
    -webkit-user-select: none; /* For Safari */
    -moz-user-select: none; /* For Firefox */
    -ms-user-select: none; /* For Internet Explorer/Edge */
}
.data-container {
    margin-top: -11px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.user-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #2c2633;
    margin-bottom: -42px;
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
