<template>
    <span class="textt">
        <IconStopwatch size="23px" :style="{ marginBottom: '-6.5px', marginRight: '3px' }" />{{ props.time }} +
        {{ props.increment }}</span
    >
</template>

<script setup lang="ts">
import { IconStopwatch } from '@tabler/icons-vue'
const props = defineProps<{ time: string; increment: string }>()
</script>

<style scoped>
.textt {
    font-weight: 700;
    background-color: #222222;
    color: orange;
    padding-top: 1px;
    padding-bottom: 3px;
    border-radius: 4px;
    padding-left: 2px;
    padding-right: 8px;
    white-space: nowrap;
}
</style>
