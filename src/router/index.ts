import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../pages/MainPage.vue'),
        },
        {
            path: '/player/:playerName',
            name: 'player',
            component: () => import('../pages/PlayerPage.vue'),
            props: true,
        },
        {
            path: '/amdin',
            name: 'amdin',
            component: () => import('../pages/AdminPage.vue'),
        },
        {
            path: '/pickem',
            name: 'pickem',
            component: () => import('../pages/PickemPage.vue'),
        },
        {
            path: '/format-turnieju',
            name: 'format',
            component: () => import('../pages/TournamentFormat.vue'),
        },
        {
            path: '/twitch/callback',
            name: 'TwitchCallback',
            component: () => import('../pages/TwitchCallback.vue'),
        },
    ],
})

export default router
