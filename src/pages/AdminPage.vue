<template>
    <div class="main-container">
        <template v-if="userStore.userLoggedIn">
            <Button @click="userStore.logout()" severity="danger">Logout</Button>
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
import { ref } from 'vue'

const userStore = useUserStore()

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
</style>
