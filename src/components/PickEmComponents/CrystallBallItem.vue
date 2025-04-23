<template>
    <div class="container">
        <img
            :style="{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }"
            :src="props.image ?? QuestionAvatar"
        />

        <div
            :style="{
                position: 'absolute',
                left: '0px',
                top: '0px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
            }"
        >
            <h2>{{ props.title }}</h2>
            <slot></slot>
        </div>
        <div
            :style="{
                position: 'absolute',
                left: '0px',
                bottom: '0px',
                width: '50px',
                height: '30px',
                fontWeight: 700,
                fontSize: '14px',
                color: 'orange',
                backgroundColor: '#121212',
                borderTopRightRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }"
        >
            {{ props.points + ' pkt' }}
        </div>
        <IconHelpHexagonFilled
            v-if="props.desc"
            v-tooltip.top="props.desc"
            :size="20"
            color="orange"
            :style="{ position: 'absolute', right: '3px', top: '3px' }"
        />
    </div>
</template>
<script setup lang="ts">
import QuestionAvatar from '@/assets/icons/question.png'
import { IconHelpHexagonFilled } from '@tabler/icons-vue'
const props = defineProps<{
    title: string
    image?: string
    points: number
    desc?: string
}>()
</script>
<style scoped>
.container {
    width: 200px;
    height: 240px;
    background-color: #18181b;
    border-radius: 8px;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    transition: background-color 0.3s ease;
}
.container:hover {
    background-color: #36363a;
}
</style>
