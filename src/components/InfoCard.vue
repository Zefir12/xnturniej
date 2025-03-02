<template>
    <div class="main-container">
        <div class="shadow-div"></div>
        <div class="inside-container">
            <span :style="{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }">Wydarzenia</span>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-container {
    position: relative;
    width: 30rem;
    display: flex;
    flex-direction: column;
    background-color: #18181b;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    z-index: 8;
    box-shadow:
        0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.inside-container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    align-items: stretch;
}
.shadow-div {
    position: absolute;
    border-radius: 12px;
    top: 0;
    left: -20px;
    width: 24px;
    background-color: #121212;
    height: 100%;
    z-index: 9;
}
</style>
