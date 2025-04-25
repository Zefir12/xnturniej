<template>
    <CountDownTimer
        text="Możliwość wyboru zablokuje się za:"
        :date="expirationDates.laddersClose"
        rectColor="#222222"
    />
    <br /><br />
    <StyledButton @click="saveLadder" :disabled="!changes">Zapisz</StyledButton>
    <div :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }">
        <img :src="CrownIcon" :style="{ width: '20px', height: '20px', marginTop: '16px', marginRight: '12px' }" />
        <h2 :style="{ marginBottom: '2rem', marginTop: '3rem', color: 'orange' }">Drabinka wygranych</h2>
        <img :src="CrownIcon" :style="{ width: '20px', height: '20px', marginTop: '16px', marginLeft: '10px' }" />
    </div>

    <div class="main-container" :style="{ position: 'relative' }">
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
            <LadderSelectPlayerBox
                v-model="ladderW.a"
                a="a869eba0-ad12-11eb-b429-1d193d279471"
                b="98f224b0-998c-11eb-9cd5-abe66a43618c"
            />
            <LadderSelectPlayerBox
                v-model="ladderW.b"
                a="d56506e2-747d-11ed-b280-8d2bac408b0d"
                b="dd3a3172-ee19-11ef-84e3-1d869f158093"
            />
            <LadderSelectPlayerBox v-model="ladderW.c" a="2eb6a6f0-3df4-11eb-b13f-edcfbaf98d7b" b="b" />
            <LadderSelectPlayerBox v-model="ladderW.d" a="a" b="5177ad7a-3e3e-11eb-b1e4-4fc24844be0f" />
        </div>
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }">
            <LadderSelectPlayerBox
                text="Półfinał"
                :a="ladderW.a"
                :b="ladderW.b"
                v-model="ladderW.w1"
                v-model:lost="ladderW.l1"
            />
            <LadderSelectPlayerBox
                text="Półfinał"
                :a="ladderW.c"
                :b="ladderW.d"
                v-model="ladderW.w2"
                v-model:lost="ladderW.l2"
            />
        </div>
        <div
            class="column"
            :style="{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }"
        >
            <LadderSelectPlayerBox
                text="Finał"
                :a="ladderW.w1"
                :b="ladderW.w2"
                v-model="ladderW.first"
                v-model:lost="ladderW.second"
            />
            <LadderSelectPlayerBox
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
    <div class="main-container" :style="{ position: 'relative' }">
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
            <LadderSelectPlayerBox
                v-model="ladderL.a"
                a="59482f96-4e7b-11eb-b365-3d75dc4dac27"
                b="c49386f0-a924-11ed-88da-cd5896a24560"
            />
            <LadderSelectPlayerBox
                v-model="ladderL.b"
                a="661e726e-b17c-11ed-97ad-175efc8ca79c"
                b="b68f03f2-41ef-11eb-b636-9ddfe076e3d4"
                disabled
            />
            <LadderSelectPlayerBox v-model="ladderL.c" a="9182bba4-8cec-11ed-9f28-a1a555fdd6af" b="b" />
            <LadderSelectPlayerBox v-model="ladderL.d" a="a" b="cc9cbaec-71fe-11eb-b3f6-4b737133070f" />
        </div>
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }">
            <LadderSelectPlayerBox
                text="Półfinał"
                :a="ladderL.a"
                :b="ladderL.b"
                v-model="ladderL.w1"
                v-model:lost="ladderL.l1"
            />
            <LadderSelectPlayerBox
                text="Półfinał"
                :a="ladderL.c"
                :b="ladderL.d"
                v-model="ladderL.w2"
                v-model:lost="ladderL.l2"
            />
        </div>
        <div
            class="column"
            :style="{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }"
        >
            <LadderSelectPlayerBox
                text="Finał"
                :a="ladderL.w1"
                :b="ladderL.w2"
                v-model="ladderL.first"
                v-model:lost="ladderL.second"
            />
            <LadderSelectPlayerBox
                text="3 miejsce"
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
        Drabinka może pozwolić picknąć np. dwie kasie do połfinałów, trzeba to narazie niestety ręcznie poprawić, prosze
        uważać i pamiętać o zapisywaniu, dane są bezpieczne jak zapiszecie, a ja będe poprawiał wygląd drabinek w
        międzyczasie
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
import { expirationDates } from '@/common/consts'

const changes = ref(false)
const userStore = useUserStore()
const toast = useToast()

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
    b: '661e726e-b17c-11ed-97ad-175efc8ca79c',
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

watch(
    [() => ladderW.value, () => ladderW.value],
    () => {
        changes.value = true
    },
    { immediate: false, deep: true },
)

watch(
    () => userStore.playerData?.ladderL,
    () => {
        if (!userStore.playerData?.ladderL) return
        ladderL.value = userStore.playerData?.ladderL
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
