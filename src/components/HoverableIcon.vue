<template>
    <div :style="{ position: 'absolute', top: '0px', left: '0px' }">
        <div class="hoverable" @click="uiStore.sidePanelOpen = !uiStore.sidePanelOpen">
            <slot />
        </div>
        <div class="glowing-element" :style="{ position: 'absolute', top: '0px', left: '0px', pointerEvents: 'none' }">
            <slot />
        </div>
        <div class="" :style="{ position: 'absolute', top: '0px', left: '0px', pointerEvents: 'none' }">
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore'

const uiStore = useUiStore()
</script>
<style scoped>
.hoverable {
    cursor: pointer;
    transition: all 0.1s ease;
}
.hoverable:hover {
    color: orange;
    /* add your hover effect styles here */
    filter: blur(7px) brightness(1.2);
}

@keyframes glow {
    0% {
        filter: blur(1px) brightness(0.6) opacity(0.3);
    }
    50% {
        filter: blur(5px) brightness(1) opacity(0.6);
    }
    100% {
        filter: blur(1px) brightness(0.6) opacity(0.3);
    }
}

.glowing-element {
    color: orange;
    animation: glow 3s infinite;
}
</style>
