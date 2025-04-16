<template>
    <div class="container">
        <span>{{ props.title }}</span>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string
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
