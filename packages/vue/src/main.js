import { createApp } from 'vue'
import App from '~/App'
import BtnTemp from '~/components/BtnTemp'

const app = createApp(App)
app.component('BtnTemp', BtnTemp)
app.mount('#app')
