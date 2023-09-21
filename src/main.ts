import './styles/main.scss'

import { createApp } from 'vue'

import ElePlus from '@/utils/Element-plus'
import EleIcon from '@/utils/Element-icon'
import pinia from '@/global/pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(ElePlus)
app.use(EleIcon)
app.use(pinia)

app.mount('#app')
