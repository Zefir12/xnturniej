<template>
    <div class="main-container">
        <template v-if="userStore.userLoggedIn">
            <div class="groups">
                Grupa A:
                <div class="group-div">
                    <PlayerSelector v-model="players.a1" />
                    <PlayerSelector v-model="players.a2" />
                    <PlayerSelector v-model="players.a3" />
                    <PlayerSelector v-model="players.a4" />
                </div>
                Grupa B:
                <div class="group-div">
                    <PlayerSelector v-model="players.b1" />
                    <PlayerSelector v-model="players.b2" />
                    <PlayerSelector v-model="players.b3" />
                    <PlayerSelector v-model="players.b4" />
                </div>
                Grupa C:
                <div class="group-div">
                    <PlayerSelector v-model="players.c1" />
                    <PlayerSelector v-model="players.c2" />
                    <PlayerSelector v-model="players.c3" />
                    <PlayerSelector v-model="players.c4" />
                </div>
                Grupa D:
                <div class="group-div">
                    <PlayerSelector v-model="players.d1" />
                    <PlayerSelector v-model="players.d2" />
                    <PlayerSelector v-model="players.d3" />
                    <PlayerSelector v-model="players.d4" />
                </div>
            </div>
            <StyledButton @click="saveGroups">Zapisz zmiany</StyledButton>
            <div v-if="false" @click="userStore.logout()" severity="danger">Logout</div>
        </template>
        <template v-if="!userStore.userLoggedIn">
            <div class="buttons">
                <InputText v-model="login" placeholder="Login" type="text" />
                <InputText v-model="password" placeholder="Password" type="password" />
            </div>
            <div
                @click="userStore.login(login, password)"
                :style="{ marginLeft: '2rem', color: 'orange', cursor: 'pointer' }"
            >
                <IconKeyFilled />
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { InputText } from 'primevue'
import { IconKeyFilled } from '@tabler/icons-vue'
import { useUserStore } from '@/stores/userStore'
import { onBeforeMount, reactive, ref } from 'vue'
import PlayerSelector from '@/components/AdminComponents/PlayerSelector.vue'
import StyledButton from '@/components/StyledButton.vue'
import api from '@/common/api'
import { getPlayerByUuid } from '@/common/helpers'

const userStore = useUserStore()

const players = reactive({
    a1: '',
    a2: '',
    a3: '',
    a4: '',
    b1: '',
    b2: '',
    b3: '',
    b4: '',
    c1: '',
    c2: '',
    c3: '',
    c4: '',
    d1: '',
    d2: '',
    d3: '',
    d4: '',
})

const saveGroups = async () => {
    const obj = [
        {
            group: 'a',
            players: [
                { place: '1', uuid: !players.a1 ? '' : players.a1.uuid },
                { place: '2', uuid: !players.a2 ? '' : players.a2.uuid },
                { place: '3', uuid: !players.a3 ? '' : players.a3.uuid },
                { place: '4', uuid: !players.a4 ? '' : players.a4.uuid },
            ],
        },
        {
            group: 'b',
            players: [
                { place: '1', uuid: !players.b1 ? '' : players.b1.uuid },
                { place: '2', uuid: !players.b2 ? '' : players.b2.uuid },
                { place: '3', uuid: !players.b3 ? '' : players.b3.uuid },
                { place: '4', uuid: !players.b4 ? '' : players.b4.uuid },
            ],
        },
        {
            group: 'c',
            players: [
                { place: '1', uuid: !players.c1 ? '' : players.c1.uuid },
                { place: '2', uuid: !players.c2 ? '' : players.c2.uuid },
                { place: '3', uuid: !players.c3 ? '' : players.c3.uuid },
                { place: '4', uuid: !players.c4 ? '' : players.c4.uuid },
            ],
        },
        {
            group: 'd',
            players: [
                { place: '1', uuid: !players.d1 ? '' : players.d1.uuid },
                { place: '2', uuid: !players.d2 ? '' : players.d2.uuid },
                { place: '3', uuid: !players.d3 ? '' : players.d3.uuid },
                { place: '4', uuid: !players.d4 ? '' : players.d4.uuid },
            ],
        },
    ]
    await api.post('/pickem/setgroups', obj)
}

onBeforeMount(async () => {
    const groups = await api.get('/pickem/getgroups')

    const groupLetters = ['a', 'b', 'c', 'd']

    groupLetters.forEach((group, gi) => {
        for (let pi = 0; pi < 4; pi++) {
            const uuid = groups.data[gi]?.players[pi]?.uuid || ''
            players[`${group}${pi + 1}`] = uuid === '' ? '' : getPlayerByUuid(uuid)
        }
    })
})

const login = ref('')
const password = ref('')
</script>

<style scoped>
.main-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.group-div {
    display: flex;
    flex-direction: column;
    width: 200px;
    gap: 0.2rem;
}
.groups {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>
