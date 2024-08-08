import '@/assets/styles/fonts.css'
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
          class: ['block absolute bg-surface-300 rounded-full pointer-events-none'],
          style: 'transform: scale(0)',
        },
      },
    },
    toolbar: {
      root: 'flex w-full h-full justify-start pb-10 xs:pt-10 sm:pt-32',
      start: 'h-full flex items-center',
      center: 'h-full flex items-center font-bold text-4xl',
      end: 'h-full flex items-center',
    },
    button: {
      root: 'py-2 px-5 font-semibold text-lg ripple-box ',
    },
  },
})

app.directive('ripple', Ripple)
app.component('AppButton', Button)
app.component('AppToolbar', Toolbar)

app.mount('#app')
