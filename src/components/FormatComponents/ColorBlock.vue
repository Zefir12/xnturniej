<template>
    <span class="textt"> <slot></slot></span>
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
.variant-black {
    background-color: #222222;
    color: orange;
}
</style>
