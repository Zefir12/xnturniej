<template>
    <span class="textt">{{ props.l }} - {{ props.r }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{ l: string; r: string }>()
</script>

<style scoped>
.textt {
    font-weight: 700;
    background-color: #222222;
    color: orange;
    padding-bottom: 2px;
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
    white-space: nowrap;
}
</style>
