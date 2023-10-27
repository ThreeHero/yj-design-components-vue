import { createApp } from 'vue'
import App from './App.vue'
import install from './components'

import 'ant-design-vue/dist/reset.css'

const app = createApp(App)
app.use(install)

app.mount('#app')
