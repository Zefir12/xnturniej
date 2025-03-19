import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import Aura from '@primeuix/themes/aura'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)

app.directive('tooltip', Tooltip)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: true,
        },
    },
})

app.mount('#app')
