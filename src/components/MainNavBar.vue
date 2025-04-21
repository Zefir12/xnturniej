<template>
    <div class="main-container">
        <a :style="{ textDecoration: 'none' }" href="/format-turnieju"><div class="option">Format Turnieju</div></a>
        <a :style="{ textDecoration: 'none' }" href="/pickem"><div class="option">Pick'em Challenge</div></a>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.option {
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
.main-container {
    width: 100%;
    margin-top: -20px;
    position: relative;
    display: flex;
    gap: 6px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;
}
</style>
