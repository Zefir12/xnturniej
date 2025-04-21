<template>
    <span class="textt">
        {{ props.points }}
        pkt</span
    >
</template>

<script setup lang="ts">
const props = defineProps<{ points: string }>()
</script>

<style scoped>
.textt {
    font-weight: 700;
    background-color: #222222;
    border: solid 1px orange;
    color: orange;
    padding-top: 0px;
    padding-bottom: 2px;
    border-radius: 4px;
    padding-left: 5px;
    padding-right: 5px;
    white-space: nowrap;
}
</style>
