/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import { authStore } from '@/store/auth'
import store from '@/store/store'
import { abilitiesPlugin } from '@casl/vue'
import '@core-scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import axios from 'axios'
import 'sweetalert2/dist/sweetalert2.min.css'
import VueSweetalert2 from 'vue-sweetalert2'
import { createApp } from 'vue/dist/vue.esm-bundler' // <--- 1
import i18n from './i18n'
import ability from './services/ability'

loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)

//pinia
app.use(store)

app.use(router)
router.beforeEach(async to => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const auth = authStore()
  const item = auth.getPermissions
  // if (to.meta.is_not_auth && auth.isAuthenticated) return '/dashboard'
  if (to.meta.requiresAuth && !auth.isAuthenticated) return '/login'
  if (to.meta.permission && !item.includes(to.meta.permission)) return '/dashboard'
})

app.use(i18n)

app.use(VueSweetalert2)

app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})

//axios
window.axios = axios
const token = localStorage.getItem('access_token')
window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  Accept: 'application/json',
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
  Authorization: `Bearer ${token}`,
}

// window.axios.defaults.withCredentials = true

// app.use(VueAxios, axios)

// Mount vue app
router.isReady().then(() => {
  app.mount('#app')
})
