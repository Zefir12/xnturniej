import type { TwitchUserWithId } from '@/models/models'
import { loginUser } from '@/services/userService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
    const userLoggedIn = ref(false)
    const router = useRouter()

    const pickemTwitchUser = ref<null | TwitchUserWithId>(
        localStorage.getItem('pickemTwitchUser')
            ? JSON.parse(localStorage.getItem('pickemTwitchUser') as string)
            : null,
    )

    const login = async (login: string, password: string) => {
        const res = await loginUser(login, password)
        if (res) {
            console.log(res)
            localStorage.setItem('access_token', res.accessToken)
            localStorage.setItem('refresh_token', res.refreshToken)
            userLoggedIn.value = true
        }
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        userLoggedIn.value = false
        router.push('/')
    }

    const logTwitchUser = (user: TwitchUserWithId) => {
        localStorage.setItem('pickemTwitchUser', JSON.stringify(user))
        pickemTwitchUser.value = user
    }

    return { userLoggedIn, login, logout, pickemTwitchUser, logTwitchUser }
})
