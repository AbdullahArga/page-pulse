/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import { abilitiesPlugin } from '@casl/vue'
import '@core-scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler' // <--- 1
import i18n from './i18n'
import ability from './services/ability'

import axios from 'axios'

loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.use(i18n)

app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})

//axios
window.axios = axios
window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  Accept: 'application/json',
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
}
window.axios.defaults.withCredentials = true

// app.use(VueAxios, axios)

// Mount vue app
app.mount('#app')
