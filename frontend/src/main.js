import './css/main.css'

import { createApp } from 'vue'
import { catchError } from './utils/catchError'
// 暂时没必要用状态管理
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'element-plus/es/components/message/style/css'

const app = createApp(App)

app.use(router)
app.mount('#app')

catchError()
