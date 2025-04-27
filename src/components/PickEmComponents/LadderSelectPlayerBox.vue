<template>
    <div
        class="cont"
        :style="{
            opacity: props.disabled ? 0.7 : 1,
            pointerEvents: props.disabled ? 'none' : 'auto',
            height: '80px',
            position: 'relative',
        }"
    >
        <div
            class="vertical-text"
            :style="{ position: 'absolute', bottom: '-1px', left: '-20px', textAlign: 'center', fontWeight: '700' }"
        >
            {{ props.text }}
        </div>
        <div
            class="option"
            :class="{ win: model === props.a && model }"
            :style="model === props.a && model ? {} : { opacity: '0.5' }"
            @click="
                () => {
                    model = props.a
                    modelLost = props.b
                }
            "
        >
            <img
                v-if="getPlayerByUuid(props.a)?.avatar"
                :src="getPlayerByUuid(props.a)?.avatar"
                :style="{ width: '40px', height: '40px', marginRight: '10px' }"
            />
            <div>{{ getPlayerByUuid(props.a)?.name }}</div>
            <img
                :src="CrownIcon"
                :style="{ width: '20px', height: '20px', marginLeft: '10px' }"
                v-if="model === props.a && model && !props.correct"
            />

            <span
                :style="{ color: '#ffa500', marginLeft: 'auto' }"
                v-if="props.correct == model && model && props.correct && props.a == model"
            >
                +3pkt</span
            >
            <IconCheck
                :style="{ marginLeft: '2px', marginRight: '10px' }"
                stroke-width="4"
                v-if="props.correct == model && model && props.correct && props.a == model"
                color="#79f041"
            />
            <IconX
                :style="{ marginLeft: 'auto', marginRight: '10px' }"
                v-if="props.correct != model && model && props.correct && props.a == model"
                stroke-width="3"
                color="red"
            />
        </div>
        <div
            class="option"
            :class="{ win: model === props.b && model }"
            :style="model === props.b && model ? {} : { opacity: '0.5' }"
            @click="
                () => {
                    model = props.b
                    modelLost = props.a
                }
            "
        >
            <img
                v-if="getPlayerByUuid(props.b)?.avatar"
                :src="getPlayerByUuid(props.b)?.avatar"
                :style="{ width: '40px', height: '40px', margin: '0', marginRight: '10px' }"
            />
            <div>{{ getPlayerByUuid(props.b)?.name }}</div>
            <img
                :src="CrownIcon"
                :style="{ width: '20px', height: '20px', marginLeft: '10px' }"
                v-if="model === props.b && model && !props.correct"
            />
            <span
                :style="{ color: '#ffa500', marginLeft: 'auto' }"
                v-if="props.correct == model && model && props.correct && props.b == model"
            >
                +3pkt</span
            >
            <IconCheck
                :style="{ marginLeft: '2px', marginRight: '10px' }"
                stroke-width="4"
                v-if="props.correct == model && model && props.correct && props.b == model"
                color="#79f041"
            />
            <IconX
                :style="{ marginLeft: 'auto', marginRight: '10px' }"
                v-if="props.correct != model && model && props.correct && props.b == model"
                stroke-width="3"
                color="red"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { getPlayerByUuid } from '@/common/helpers'
import CrownIcon from '@/assets/icons/crown.png'
import { watch } from 'vue'
import { IconCheck, IconX } from '@tabler/icons-vue'
const model = defineModel<string | null>({ default: null })
const modelLost = defineModel<string | null>('lost', { default: null }) // corresponds to v-model:lost
const props = defineProps<{
    a: string
    b: string
    disabled?: boolean
    text?: string
    watchOn: boolean
    correct?: string
}>()

watch([() => props.a, () => props.b], ([newA, newB], [oldA, oldB]) => {
    if (!props.watchOn) {
        return
    }
    if (newA != oldA) {
        if (model.value == '') {
            return
        }
        if (model.value == oldA) {
            model.value = newA
        } else {
            modelLost.value = newA
        }
    }
    if (newB != oldB) {
        if (model.value == '') {
            return
        }
        if (model.value == oldB) {
            model.value = newB
        } else {
            modelLost.value = newB
        }
    }
})
</script>

<style scoped>
.win {
    background-color: #5c5c69 !important;
    border: 1px solid #b374168c !important;
    font-weight: 700 !important;
}
.option {
    background-color: #121212;
    width: 220px;
    height: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2px;
    background-color: #18181b;
    overflow: hidden;
    border-radius: 5px;

    transition: background-color 0.1s ease;
}
.vertical-text {
    writing-mode: vertical-lr; /* This makes the text vertical */
    transform: rotate(180deg); /* Adjust text orientation if needed */
    font-size: 14px;
    color: white;
    margin-right: 10px; /* Adjust margin for positioning */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
