import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'

console.log("А что это мы тут делаем?🧐🧐🧐")

const app = createApp(App)
app.use(router)
app.mount('#app')
