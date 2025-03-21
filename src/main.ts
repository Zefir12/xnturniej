import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import Aura from '@primeuix/themes/aura'
import Tooltip from 'primevue/tooltip'
import { definePreset } from '@primeuix/themes'

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{amber.50}',
            100: '{amber.100}',
            200: '{amber.200}',
            300: '{amber.300}',
            400: '{amber.400}',
            500: '{amber.500}',
            600: '{amber.600}',
            700: '{amber.700}',
            800: '{amber.800}',
            900: '{amber.900}',
            950: '{amber.950}',
        },
        formField: {
            hoverBorderColor: '{primary.color}',
        },
    },
})

const app = createApp(App)

app.directive('tooltip', Tooltip)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        dark: true,
    },
})

app.mount('#app')
