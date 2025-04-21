<template>
    <span :class="'textt' + ' ' + props.variant"> <slot></slot></span>
</template>

<script setup lang="ts">
const props = defineProps<{ variant: string }>()
</script>

<style scoped>
.textt {
    font-weight: 700;

    padding-top: 0px;
    padding-bottom: 2px;
    border-radius: 4px;
    padding-left: 5px;
    padding-right: 5px;
    white-space: nowrap;
}
.black {
    border: solid 1px #ffffff6c;
    background-color: #000000;
    color: #faf9f6;
}
.white {
    background-color: #faf9f6;
    color: #181818;
}
</style>
