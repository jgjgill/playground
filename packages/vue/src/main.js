import { createApp } from 'vue'
import App from '~/App'
import BtnTemp from '~/components/BtnTemp'
import WorldTemp from '~/components/WorldTemp'
import fetchPlugin from '~/plugins/fetch'
import ModalTemp from '~/components/ModalTemp'

const app = createApp(App)
app.use(fetchPlugin, { pluginName: '$myName' })
app.component('BtnTemp', BtnTemp)
app.component('WorldTemp', WorldTemp)
app.component('ModalTemp', ModalTemp)
app.mount('#app')
