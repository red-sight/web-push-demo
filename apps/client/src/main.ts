import '@/assets/styles/tailwind-base.css'
import '@/assets/styles/variables.css'
import '@/assets/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import global from '@/assets/presets/global'
import Ripple from 'primevue/ripple'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  unstyled: true,
  global,
  ripple: true,
  pt: {
    global,
    directives: {
      ripple: {
        root: {
          class: ['block absolute bg-surface-0/50 rounded-full pointer-events-none'],
          style: 'transform: scale(0)',
        },
      },
    },
    toolbar: {
      root: 'flex w-full h-full justify-between px-5 py-10',
      start: 'h-full flex items-center',
      center: 'h-full flex items-center font-bold text-4xl',
      end: 'h-full flex items-center',
    },
    button: {
      root: 'py-2 px-5 font-semibold text-lg rounded-full ripple-box bg-primary text-white',
    },
  },
})

app.directive('ripple', Ripple)
app.component('AppButton', Button)
app.component('AppToolbar', Toolbar)

app.mount('#app')
