<template>
    <div class="main-container">
        <a :style="{ textDecoration: 'none' }" href="/format-turnieju"><div class="option">Format Turnieju</div></a>
        <a :style="{ textDecoration: 'none', position: 'relative' }" href="/pickem"
            ><div class="option">Pick'em Challenge</div>
            <div class="dot"></div
        ></a>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.dot {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 12px;
    height: 12px;
    background-color: rgb(255, 0, 0);
    border-radius: 50%;
}
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
