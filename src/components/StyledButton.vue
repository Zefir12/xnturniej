<template>
    <button class="buton" :disabled="props.disabled">
        <slot />
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{ disabled: boolean }>()
</script>

<style scoped>
.buton {
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    color: orange;
    background-color: #222222;
    height: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    transition:
        opacity 0.2s,
        cursor 0.2s;
}

/* Disabled state styling */
.buton:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: grey;
}
</style>
