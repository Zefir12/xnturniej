<template>
    <div class="buton">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

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
    padding: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 4px;
}
</style>
