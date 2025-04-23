<template>
    <div class="cont">
        <div
            class="option"
            :style="model === 'a' ? { 'border-color': 'orange', color: 'orange' } : {}"
            @click="model = 'a'"
        >
            <slot name="a" />
        </div>
        <div
            class="option"
            :style="model === 'b' ? { 'border-color': 'orange', color: 'orange' } : {}"
            @click="model = 'b'"
        >
            <slot name="b" />
        </div>
    </div>
</template>

<script setup lang="ts">
const model = defineModel<string | null>({ default: null })
</script>

<style scoped>
.cont {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 700;
}
.option {
    background-color: #121212;
    width: 50%;
    height: 50px;
    margin: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border-color: #52525b;
    border-style: solid;
    border-width: 1px;
    transition: background-color 0.1s ease;
}

.option:hover {
    background-color: orange;
    transition: background-color 0.3s ease;
}
</style>
