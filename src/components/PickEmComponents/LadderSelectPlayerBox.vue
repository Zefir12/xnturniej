<template>
    <div
        class="cont"
        :style="{ opacity: props.disabled ? 0.7 : 1, pointerEvents: props.disabled ? 'none' : 'auto', height: '60px' }"
    >
        <div
            class="option"
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
                :style="{ width: '18px', height: '18px', margin: '0' }"
            />
            <div>{{ getPlayerByUuid(props.a)?.name ?? 'TBD' }}</div>
        </div>
        <div
            class="option"
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
                :style="{ width: '18px', height: '18px', margin: '0' }"
            />
            <div>{{ getPlayerByUuid(props.b)?.name ?? 'TBD' }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getPlayerByUuid } from '@/common/helpers'
const model = defineModel<string | null>({ default: null })
const modelLost = defineModel<string | null>('lost', { default: null }) // corresponds to v-model:lost
const props = defineProps<{ a: string; b: string; disabled?: boolean }>()
</script>

<style scoped>
.option {
    background-color: #121212;
    width: 220px;
    height: 30px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border-color: #52525b;
    border-style: solid;
    border-width: 1px;
    transition: background-color 0.1s ease;
}
</style>
