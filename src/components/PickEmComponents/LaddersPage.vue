<template>
    <p>🚨 Dzisiaj jest ostatni dzień i trzeb wypełnić tablekę do końca, wciąż można edytować finały i półfinały 🚨</p>
    <CountDownTimer
        text="Obstawianie półfinałów i finałów zablokuje sie za:"
        :date="expirationDates.fianallClose"
        rectColor="#222222"
    />
    <div
        v-if="expirationDates.fianallClose.getTime() > Date.now()"
        :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }"
    >
        <StyledButton @click="saveLadder" :disabled="!changes">Zapisz</StyledButton
        ><StyledButton @click="resetLadders">Reset</StyledButton>
    </div>

    <div :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }">
        <img :src="CrownIcon" :style="{ width: '20px', height: '20px', marginTop: '16px', marginRight: '12px' }" />
        <h2 :style="{ marginBottom: '2rem', marginTop: '3rem', color: 'orange' }">Drabinka wygranych</h2>
        <img :src="CrownIcon" :style="{ width: '20px', height: '20px', marginTop: '16px', marginLeft: '10px' }" />
    </div>

    <div
        class="main-container"
        :class="{ 'no-select': expirationDates.laddersClose.getTime() < Date.now() }"
        :style="{ position: 'relative' }"
    >
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.laddersClose.getTime() < Date.now()"
                v-model="ladderW.a"
                a="a869eba0-ad12-11eb-b429-1d193d279471"
                b="98f224b0-998c-11eb-9cd5-abe66a43618c"
                :correct="playerToUuid(PlayerAccounts.Kasix)"
            />
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.laddersClose.getTime() < Date.now()"
                v-model="ladderW.b"
                a="d56506e2-747d-11ed-b280-8d2bac408b0d"
                b="dd3a3172-ee19-11ef-84e3-1d869f158093"
                :correct="playerToUuid(PlayerAccounts.RandomBruces)"
            />
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.laddersClose.getTime() < Date.now()"
                v-model="ladderW.c"
                a="2eb6a6f0-3df4-11eb-b13f-edcfbaf98d7b"
                b="071f3ac4-5f0c-11eb-828b-1768796e906d"
                :correct="playerToUuid(PlayerAccounts.Delord)"
            />
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.laddersClose.getTime() < Date.now()"
                v-model="ladderW.d"
                a="8a2269ea-3dc0-11eb-8750-c5b5bc9f99f1"
                b="5177ad7a-3e3e-11eb-b1e4-4fc24844be0f"
                :correct="playerToUuid(PlayerAccounts.Kubon)"
            />
        </div>
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }">
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.fianallClose.getTime() < Date.now()"
                text="Półfinał"
                :a="playerToUuid(PlayerAccounts.Kasix)"
                :b="playerToUuid(PlayerAccounts.RandomBruces)"
                v-model="ladderW.w1"
                v-model:lost="ladderW.l1"
            />
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.fianallClose.getTime() < Date.now()"
                text="Półfinał"
                :a="playerToUuid(PlayerAccounts.Delord)"
                :b="playerToUuid(PlayerAccounts.Kubon)"
                v-model="ladderW.w2"
                v-model:lost="ladderW.l2"
            />
        </div>
        <div
            class="column"
            :style="{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }"
        >
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.fianallClose.getTime() < Date.now()"
                text="Finał"
                :a="ladderW.w1"
                :b="ladderW.w2"
                v-model="ladderW.first"
                v-model:lost="ladderW.second"
            />
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.fianallClose.getTime() < Date.now()"
                text="3 miejsce"
                :a="ladderW.l1"
                :b="ladderW.l2"
                v-model="ladderW.third"
                v-model:lost="ladderW.fourth"
            />
        </div>
        <div
            :style="{
                position: 'absolute',
                width: '80px',
                height: '80px',
                top: '0',
                right: '110px',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#18181b',
                border: '1px solid #ffa6006b',
            }"
        >
            <img
                v-if="getPlayerByUuid(ladderW.first)?.avatar"
                :style="{ width: '80px', height: '80px' }"
                :src="getPlayerByUuid(ladderW.first)?.avatar"
            />
        </div>
    </div>
    <h2 :style="{ marginBottom: '2rem', marginTop: '6rem', color: 'orange' }">Drabinka przegranych</h2>
    <div
        class="main-container"
        :class="{ 'no-select': expirationDates.laddersClose.getTime() < Date.now() }"
        :style="{ position: 'relative' }"
    >
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.laddersClose.getTime() < Date.now()"
                v-model="ladderL.a"
                a="59482f96-4e7b-11eb-b365-3d75dc4dac27"
                b="c49386f0-a924-11ed-88da-cd5896a24560"
                :correct="playerToUuid(PlayerAccounts.Nieuczesana)"
            />
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.laddersClose.getTime() < Date.now()"
                v-model="ladderL.b"
                a="661e726e-b17c-11ed-97ad-175efc8ca79c"
                b="b68f03f2-41ef-11eb-b636-9ddfe076e3d4"
                :correct="playerToUuid(PlayerAccounts.Zwierzak)"
            />
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.laddersClose.getTime() < Date.now()"
                v-model="ladderL.c"
                a="9182bba4-8cec-11ed-9f28-a1a555fdd6af"
                b="7814e9b0-410a-11eb-8e01-ef8706c45d64"
                :correct="playerToUuid(PlayerAccounts.Diables)"
            />
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.laddersClose.getTime() < Date.now()"
                v-model="ladderL.d"
                a="97709332-e8df-11ef-ae1f-699fe3713de1"
                b="cc9cbaec-71fe-11eb-b3f6-4b737133070f"
                :correct="playerToUuid(PlayerAccounts.Bladii)"
            />
        </div>
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }">
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.fianallClose.getTime() < Date.now()"
                text="Półfinał"
                :a="playerToUuid(PlayerAccounts.Nieuczesana)"
                :b="playerToUuid(PlayerAccounts.Zwierzak)"
                v-model="ladderL.w1"
                v-model:lost="ladderL.l1"
            />
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.fianallClose.getTime() < Date.now()"
                text="Półfinał"
                :a="playerToUuid(PlayerAccounts.Diables)"
                :b="playerToUuid(PlayerAccounts.Bladii)"
                v-model="ladderL.w2"
                v-model:lost="ladderL.l2"
            />
        </div>
        <div
            class="column"
            :style="{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }"
        >
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.fianallClose.getTime() < Date.now()"
                text="Finał"
                :a="ladderL.w1"
                :b="ladderL.w2"
                v-model="ladderL.first"
                v-model:lost="ladderL.second"
            />
            <LadderSelectPlayerBox
                :watchOn="loaded"
                :disabled="expirationDates.fianallClose.getTime() < Date.now()"
                text="11 miejsce"
                :a="ladderL.l1"
                :b="ladderL.l2"
                v-model="ladderL.third"
                v-model:lost="ladderL.fourth"
            />
        </div>
        <div
            :style="{
                position: 'absolute',
                width: '80px',
                height: '80px',
                top: '0',
                right: '110px',
                borderRadius: '12px',
                backgroundColor: '#18181b',
                overflow: 'hidden',
                border: '1px solid #ffa6006b',
            }"
        >
            <img
                v-if="getPlayerByUuid(ladderL.first)?.avatar"
                :style="{ width: '80px', height: '80px' }"
                :src="getPlayerByUuid(ladderL.first)?.avatar"
            />
        </div>
    </div>
    <p :style="{ color: 'orange', fontSize: '12px', marginTop: '8rem' }">
        <span :style="{ fontWeight: 'bold' }">Punktacja: </span>
        <span :style="{ fontWeight: 'bold' }">+3pkt</span> za poprawny pick w ćwierćfinale,
        <span :style="{ fontWeight: 'bold' }">+5pkt</span> za poprawny pick w półfinale,
        <span :style="{ fontWeight: 'bold' }">+8pkt</span> za poprawny pick w walce o 3 miejsce i 11 miejsce i
        <span :style="{ fontWeight: 'bold' }">+10pkt</span> za poprawne wytypowanie finalisty. <br />
        Punktacje te same dla obu drabinek, maks do zdobycia 80pkt.
    </p>
    <div style="height: 10px"></div>
</template>

<script setup lang="ts">
import LadderSelectPlayerBox from './LadderSelectPlayerBox.vue'
import { ref, watch } from 'vue'
import { getPlayerByUuid, getRandomSuccessMessage } from '@/common/helpers'
import StyledButton from '../StyledButton.vue'
import api from '@/common/api'
import { useUserStore } from '@/stores/userStore'
import { useToast } from 'primevue'
import CrownIcon from '@/assets/icons/crown.png'
import CountDownTimer from '../CountDownTimer.vue'
const loaded = ref(false)
import { expirationDates, PlayerAccounts, playerToUuid } from '@/common/consts'

const changes = ref(false)
const userStore = useUserStore()
const toast = useToast()
const counter = ref(0)

const ladderW = ref<Ladder>({
    a: '',
    b: '',
    c: '',
    d: '',
    w1: '',
    w2: '',
    l1: '',
    l2: '',
    first: '',
    second: '',
    third: '',
    fourth: '',
})

const ladderL = ref<Ladder>({
    a: '',
    b: '',
    c: '',
    d: '',
    w1: '',
    w2: '',
    l1: '',
    l2: '',
    first: '',
    second: '',
    third: '',
    fourth: '',
})

export type Ladder = {
    a: string
    b: string
    c: string
    d: string
    w1: string
    w2: string
    l1: string
    l2: string
    first: string
    second: string
    third: string
    fourth: string
}

const resetLadders = () => {
    ladderW.value = {
        a: userStore.playerData?.ladderW?.a ?? '',
        b: userStore.playerData?.ladderW?.b ?? '',
        c: userStore.playerData?.ladderW?.c ?? '',
        d: userStore.playerData?.ladderW?.d ?? '',
        w1: '',
        w2: '',
        l1: '',
        l2: '',
        first: '',
        second: '',
        third: '',
        fourth: '',
    }
    ladderL.value = {
        a: userStore.playerData?.ladderL?.a ?? '',
        b: userStore.playerData?.ladderL?.b ?? '',
        c: userStore.playerData?.ladderL?.c ?? '',
        d: userStore.playerData?.ladderL?.d ?? '',
        w1: '',
        w2: '',
        l1: '',
        l2: '',
        first: '',
        second: '',
        third: '',
        fourth: '',
    }
}

let saveTimeout: ReturnType<typeof setTimeout> | null = null // Store the timeout reference

watch(
    [() => ladderW.value, () => ladderL.value], // Watch for changes in both ladders
    () => {
        counter.value++
        if (counter.value <= 2) return
        changes.value = true

        // If there's an existing timeout, clear it
        if (saveTimeout) {
            clearTimeout(saveTimeout)
        }

        // Set a new timeout to save the ladder after 3 seconds
        saveTimeout = setTimeout(() => {
            if (expirationDates.fianallClose.getTime() > Date.now()) {
                saveLadder() // Call saveLadder after 3 seconds
            }
        }, 6000) // 3000 ms (3 seconds)
    },
    { immediate: false, deep: true },
)

watch(
    () => userStore.playerData?.ladderL,
    () => {
        if (!userStore.playerData?.ladderL) return
        ladderL.value = userStore.playerData?.ladderL
        loaded.value = true
        console.log(ladderL.value)
    },
)
watch(
    () => userStore.playerData?.ladderW,
    () => {
        if (!userStore.playerData?.ladderW) return
        ladderW.value = userStore.playerData?.ladderW
    },
)

const saveLadder = async () => {
    if (expirationDates.fianallClose.getTime() < Date.now()) {
        return
    }
    changes.value = false
    const result = await api.post('/pickem/chooseladder', {
        id: JSON.parse(localStorage.getItem('pickemTwitchUser') ?? '{}')._id,
        ladderW: ladderW.value,
        ladderL: ladderL.value,
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

    toast.add({
        severity: 'success',
        summary: 'Zapisano zmiany',
        group: 'br',
        detail: getRandomSuccessMessage(),
        life: 3000,
    })
    //window.location.reload()
}
</script>
<style scoped>
.no-select {
    user-select: none;
    pointer-events: none;
    -webkit-user-select: none; /* For Safari */
    -moz-user-select: none; /* For Firefox */
    -ms-user-select: none; /* For Internet Explorer/Edge */
}
.main-container {
    width: 900px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.column {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
