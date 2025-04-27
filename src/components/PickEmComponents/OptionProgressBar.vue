<template>
    <div class="main">
        <div v-if="name" :style="{ width: '100%', height: '100%' }">
            <div :style="{ fontSize: '11px', fontWeight: 'bold' }">{{ name }}: {{ props.value }}%</div>
            <div class="progress">
                <div
                    :style="{
                        width: `${props.value}%`,
                        backgroundColor: 'orange',
                        minHeight: '100%',
                        borderRadius: '5px',
                    }"
                ></div>
            </div>
        </div>
        <div v-else :style="{ width: '100%', height: '100%' }">
            <div :style="{ fontSize: '11px', fontWeight: 'bold' }">{{ 'Brak' }}: {{ props.value }}%</div>
            <div class="progress">
                <div
                    :style="{
                        width: `${props.value}%`,
                        backgroundColor: 'orange',
                        minHeight: '100%',
                        borderRadius: '5px',
                    }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ name?: string; value: number }>()
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: row;
}

.progress {
    border-radius: 5px;
    min-width: 100%;
    height: 20px;
    background-color: #3f3f46;
}
</style>
