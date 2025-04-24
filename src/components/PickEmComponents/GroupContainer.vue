<template>
    <div class="container" :style="{ position: 'relative' }">
        <div
            :style="{
                position: 'absolute',
                top: '0px',
                right: '0px',
                zIndex: 3,
                pointerEvents: 'none',
                backgroundColor: '#222222',
                border: '1px solid #ffa6006b',
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
                backgroundColor: 'orange',
                padding: '10px',
                filter: 'blur(18px) opacity(0.1)',
            }"
        >
            Grupa {{ props.group.toUpperCase() }}
        </div>
        <div>
            <ul ref="sortableListRef" class="sortable-list">
                <li
                    :style="{
                        height: '94px',
                        pointerEvents: expirationDates.groups.getTime() < Date.now() ? 'none' : 'all',
                    }"
                    v-for="(item, index) in items"
                    :key="index"
                    class="sortable-item"
                    :data-id="item.place"
                >
                    <div :style="{ width: '94px', height: '94px', display: 'flex', alignItems: 'center' }">
                        <img
                            :style="{
                                height: item.uuid ? '94px' : '74px',
                                width: item.uuid ? '94px' : '74px',
                                marginLeft: item.uuid ? '-1px' : '9px',
                                opacity: item.uuid ? '1' : '0.6',
                            }"
                            :src="item.uuid ? (playerMappings as any)[uuidToPlayer(item.uuid)].avatar : QuestionAvatar"
                        />
                    </div>

                    <div
                        :style="{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '600',
                            marginLeft: item.uuid != '' ? '30px' : '40px',
                        }"
                    >
                        {{ curr.findIndex((x: any) => x == item.place) + 1 }}.
                        {{ item.uuid ? (playerMappings as any)[uuidToPlayer(item.uuid)].name : 'TBD' }}
                        <div>
                            <img
                                :style="{
                                    width: '20px',
                                    height: '20px',
                                    marginLeft: '4px',
                                    transition: 'all 0.3s ease',
                                    opacity: curr.findIndex((x: any) => x == item.place) <= 1 ? '1' : '0',
                                    transform:
                                        curr.findIndex((x: any) => x == item.place) <= 1
                                            ? 'translateX(0px)'
                                            : 'translateX(100px)',
                                }"
                                :src="CrownIcon"
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Sortable from 'sortablejs'
import { usePickemStore } from '@/stores/pickemStore'
import { expirationDates, playerMappings, uuidToPlayer } from '@/common/consts'
import QuestionAvatar from '@/assets/icons/question.png'
import CrownIcon from '@/assets/icons/crown.png'

interface Props {
    group: string
}

const props = defineProps<Props>()

const pickemStore = usePickemStore()

const sortableListRef = ref<HTMLElement | null>(null)
let itey = localStorage.getItem(`group-${props.group}`)
if (itey != null) {
    if (itey.length != 17) itey = null
}
const curr = ref<string[]>(itey != null ? JSON.parse(itey) : pickemStore.getGroup(props.group).map((x) => x.place))

const parseLocalStorageGroup = () => {
    let itey = localStorage.getItem(`group-${props.group}`)
    if (itey != null) {
        if (itey.length != 17) itey = null
    }
    const group = pickemStore.getGroup(props.group)
    if (itey != null) {
        const curr = itey != null ? JSON.parse(itey) : group
        return curr.map((place: string) => group.find((item) => item.place === place))
    }
    return group
}

const items = ref<{ uuid: string; place: string }[]>(parseLocalStorageGroup())
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
            const order = Array.from(listItems ?? []).map((li) => li.dataset.id ?? '')
            curr.value = order
            localStorage.setItem(`temp-group-${props.group}`, JSON.stringify(order))
            pickemStore.addChangesCounter()
        },
    })
}

onMounted(() => {
    initializeSortable()
})

watch(
    () => pickemStore.groups,
    () => {
        items.value = parseLocalStorageGroup()
    },
    { deep: true },
)

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
.test {
    color: #ffa6006b;
}
</style>
