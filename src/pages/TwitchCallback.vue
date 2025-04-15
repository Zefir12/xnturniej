<template>
    <div>Verifying Twitch account...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../common/api.js'
import { useUserStore } from '@/stores/userStore.js'
import type { TwitchUserWithId } from '@/models/models.js'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
    const code = route.query.code

    if (!code) {
        console.error('No code in URL')
        return
    }
    try {
        const res = await api.post('/auth/twitch/callback', { code })

        userStore.logTwitchUser(res.data as TwitchUserWithId)

        router.push('/pickem') // or wherever you want
    } catch (err) {
        console.error('Error verifying Twitch:', err)
    }
})
</script>
