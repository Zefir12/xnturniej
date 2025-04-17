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
    </div>
</template>
<script setup lang="ts">
import QuestionAvatar from '@/assets/icons/question.png'
const props = defineProps<{
    title: string
    image?: string
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
