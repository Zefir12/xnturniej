<template>
    <div :style="{ position: 'relative' }">
        <div class="hoverable">
            <slot />
        </div>
        <div class="" :style="{ position: 'absolute', top: '0px', left: '0px', pointerEvents: 'none' }">
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.hoverable {
    transition:
        all 0.05s ease-in,
        all 0.2s ease-out;
}
.hoverable:hover {
    color: orange;
    filter: blur(7px) brightness(1.2);
}
</style>
