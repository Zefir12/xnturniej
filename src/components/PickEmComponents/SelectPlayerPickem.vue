<template>
    <Select
        v-model="model"
        :options="Object.values(playerMappings)"
        optionLabel="name"
        optionValue="uuid"
        placeholder="Nie wybrano"
        scroll-height="400px"
        size="small"
        class="select"
        :fluid="true"
        @update:modelValue="onPlayerSelected"
    >
        <template #value="slotProps">
            <div v-if="slotProps.value" :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
                <img
                    :src="getPlayerByUuid(slotProps.value)?.avatar"
                    :style="{ width: '18px', height: '18px', margin: '0' }"
                />
                <div>{{ getPlayerByUuid(slotProps.value)?.name }}</div>
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
import { getPlayerByUuid } from '@/common/helpers'
import Select from 'primevue/select'
import { ref } from 'vue'

const model = ref()
const emit = defineEmits(['onSelected'])

const onPlayerSelected = (selectedUuid: string) => {
    emit('onSelected', selectedUuid)
}
</script>
<style scoped>
.select {
    max-width: 150px;
}

.select :deep(.p-select) {
    background: blanchedalmond !important;
}
</style>
