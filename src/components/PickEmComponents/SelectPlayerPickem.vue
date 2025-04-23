<template>
    <Select
        v-model="model"
        :options="Object.values(playerMappings)"
        optionLabel="name"
        placeholder="pusto"
        scroll-height="400px"
        size="small"
        :fluid="true"
        class="w-full md:w-56"
    >
        <template #value="slotProps">
            <div v-if="slotProps.value" :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
                <img :src="slotProps.value.avatar" :style="{ width: '18px', height: '18px', margin: '0' }" />
                <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
                {{ slotProps.placeholder }}
            </span>
        </template>
        <template #option="slotProps">
            <div :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
                <img :src="slotProps.option.avatar" :style="{ width: '18px', height: '18px', margin: '0' }" />
                <div>{{ slotProps.option.name }}</div>
            </div>
        </template>
    </Select>
</template>

<script setup lang="ts">
import { playerMappings } from '@/common/consts'
import Select from 'primevue/select'
import { ref } from 'vue'

const model = ref()
</script>
