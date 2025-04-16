<template>
    <div class="container" :style="{ position: 'relative' }">
        <div
            :style="{
                position: 'absolute',
                top: '0px',
                right: '0px',
                zIndex: 3,
                pointerEvents: 'none',
                backgroundColor: '#6441a4',
                padding: '10px',
                fontWeight: '700',
                borderBottomLeftRadius: '12px',
                borderTopRightRadius: '8px',
            }"
        >
            Grupa {{ props.group.toUpperCase() }}
        </div>
        <div
            :style="{
                position: 'absolute',
                top: '0px',
                right: '0px',
                zIndex: 2,
                pointerEvents: 'none',
                backgroundColor: '#6441a4',
                padding: '10px',
                filter: 'blur(16px) opacity(0.1)',
            }"
        >
            Grupa {{ props.group.toUpperCase() }}
        </div>
        <div>
            <ul ref="sortableListRef" class="sortable-list">
                <li
                    :style="{ height: '94px' }"
                    v-for="(item, index) in items"
                    :key="index"
                    class="sortable-item"
                    :data-id="item"
                >
                    <div :style="{ width: '94px', height: '94px', display: 'flex', position: 'relative' }">
                        <img
                            class="itemp"
                            :style="{ height: '94px', width: '94px', marginRight: '-94px', marginLeft: '1px' }"
                            :src="(playerMappings as any)[uuidToPlayer(item)].avatar"
                        />
                        <img
                            :style="{
                                height: '94px',
                                width: '94px',
                                marginLeft: '-8px',
                                zIndex: 2,
                            }"
                            :src="(playerMappings as any)[uuidToPlayer(item)].avatar"
                        />
                    </div>

                    <div
                        :style="{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                            marginLeft: '40px',
                        }"
                    >
                        {{ curr.findIndex((x: string) => x == item) + 1 }}.
                        {{ (playerMappings as any)[uuidToPlayer(item)].name }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Sortable from 'sortablejs'
import { usePickemStore } from '@/stores/pickemStore'
import { playerMappings, uuidToPlayer } from '@/common/consts'

interface Props {
    group: string
}

const props = defineProps<Props>()

const pickemStore = usePickemStore()

const sortableListRef = ref<HTMLElement | null>(null)
const itey = localStorage.getItem(`group-${props.group}`)
const curr = ref(itey != null ? JSON.parse(itey) : pickemStore.getGroup(props.group))

const items = ref<string[]>(itey != null ? JSON.parse(itey) : pickemStore.getGroup(props.group))
let sortableInstance: Sortable | null = null

const initializeSortable = () => {
    if (!sortableListRef.value) return

    sortableInstance = Sortable.create(sortableListRef.value, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onEnd: (_evt) => {
            const listItems = sortableListRef.value?.querySelectorAll('li')
            const order = Array.from(listItems ?? []).map((li) => li.dataset.id)
            curr.value = order
            localStorage.setItem(`group-${props.group}`, JSON.stringify(order))
        },
    })
}

onMounted(() => {
    initializeSortable()
})

onUnmounted(() => {
    if (sortableInstance) {
        sortableInstance.destroy()
        sortableInstance = null
    }
})
</script>

<style scoped>
.container {
    min-width: 400px;
    height: 400px;
    background-color: transparent;
}

.sortable-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 400px;
}

.itemp {
    filter: blur(38px);
}

.sortable-item {
    padding: 0px 0px;
    overflow: hidden;
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
    background-color: #18181b;
    border-radius: 8px;
    cursor: move;
    transition: background-color 0.2s;
}

.sortable-item:hover {
}

.sortable-ghost {
    opacity: 0;
}

.sortable-chosen {
}

.sortable-drag {
}
</style>
