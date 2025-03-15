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
    ],
})

export default router
