<template>
    <h2>Drabinka wygranych</h2>
    <div class="main-container">
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', gap: '2rem' }">
            <LadderSelectPlayerBox
                v-model="ladderW.a"
                a="a869eba0-ad12-11eb-b429-1d193d279471"
                b="98f224b0-998c-11eb-9cd5-abe66a43618c"
            />
            <LadderSelectPlayerBox v-model="ladderW.b" a="d56506e2-747d-11ed-b280-8d2bac408b0d" b="" />
            <LadderSelectPlayerBox v-model="ladderW.c" a="a" b="b" />
            <LadderSelectPlayerBox v-model="ladderW.d" a="a" b="5177ad7a-3e3e-11eb-b1e4-4fc24844be0f" />
        </div>
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }">
            <LadderSelectPlayerBox :a="ladderW.a" :b="ladderW.b" v-model="ladderW.w1" v-model:lost="ladderW.l1" />
            <LadderSelectPlayerBox :a="ladderW.c" :b="ladderW.d" v-model="ladderW.w2" v-model:lost="ladderW.l2" />
        </div>
        <div
            class="column"
            :style="{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }"
        >
            <LadderSelectPlayerBox
                :a="ladderW.w1"
                :b="ladderW.w2"
                v-model="ladderW.first"
                v-model:lost="ladderW.second"
            />
            <LadderSelectPlayerBox
                :a="ladderW.l1"
                :b="ladderW.l2"
                v-model="ladderW.third"
                v-model:lost="ladderW.fourth"
            />
        </div>
    </div>
    <h2>Drabinka przegranych</h2>
    <div class="main-container">
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', gap: '2rem' }">
            <LadderSelectPlayerBox
                v-model="ladderL.a"
                a="59482f96-4e7b-11eb-b365-3d75dc4dac27"
                b="c49386f0-a924-11ed-88da-cd5896a24560"
            />
            <LadderSelectPlayerBox v-model="ladderL.b" a="661e726e-b17c-11ed-97ad-175efc8ca79c" b="" />
            <LadderSelectPlayerBox v-model="ladderL.c" a="a" b="b" />
            <LadderSelectPlayerBox v-model="ladderL.d" a="a" b="cc9cbaec-71fe-11eb-b3f6-4b737133070f" />
        </div>
        <div class="column" :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }">
            <LadderSelectPlayerBox :a="ladderL.a" :b="ladderL.b" v-model="ladderL.w1" v-model:lost="ladderL.l1" />
            <LadderSelectPlayerBox :a="ladderL.c" :b="ladderL.d" v-model="ladderL.w2" v-model:lost="ladderL.l2" />
        </div>
        <div
            class="column"
            :style="{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }"
        >
            <LadderSelectPlayerBox
                :a="ladderL.w1"
                :b="ladderL.w2"
                v-model="ladderL.first"
                v-model:lost="ladderL.second"
            />
            <LadderSelectPlayerBox
                :a="ladderL.l1"
                :b="ladderL.l2"
                v-model="ladderL.third"
                v-model:lost="ladderL.fourth"
            />
        </div>
    </div>
    <div style="height: 200px"></div>
</template>

<script setup lang="ts">
import LadderSelectPlayerBox from './LadderSelectPlayerBox.vue'
import { reactive } from 'vue'

const ladderW = reactive({
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

const ladderL = reactive({
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
