<template>
    <div
        :style="{
            backgroundColor: isDarkMode() ? '#18181b' : '#fff',
        }"
        class="main-container"
    >
        <div class="inside-container">
            <span :style="{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', position: 'relative' }"
                >Ogłoszenia
            </span>
            {{ 'W budowie..' }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { isDarkMode } from '@/common/helpers'
</script>

<style scoped>
.main-container {
    position: relative;
    display: flex;
    flex-grow: 1;
    height: 600px;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.4s ease;
}

.inside-container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    align-items: stretch;
    max-width: 480px;
}
.shadow-div {
    position: absolute;
    border-radius: 12px;
    top: 0;
    left: -20px;
    width: 24px;
    height: 100%;
    z-index: 9;
}
</style>
