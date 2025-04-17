<template>
    <div class="container">
        <h2>{{ props.title }}</h2>
        <img
            :style="{ height: '120px', marginTop: '-5px', opacity: props.image != null ? 1 : 0.7 }"
            :src="props.image ?? QuestionAvatar"
        />
        <slot></slot>
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
    flex-direction: column;
    align-items: center;
    font-size: 12px;
}
</style>
