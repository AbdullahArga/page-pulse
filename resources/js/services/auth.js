import { authStore } from '@/store/auth'
import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { ABILITY_TOKEN } from '@casl/vue'
// import axios from 'axios';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const user = reactive({
  name: '',
  email: '',
})
export default function authService() {
  const auth = authStore()
  const ability = inject(ABILITY_TOKEN)

  const processing = ref(false)
  const validationError = ref({})
  const router = useRouter()
  const loginForm = reactive({
    email: '',
    password: '',
    remember: false,
  })
  const submitLogin = async () => {
    if (processing.value) {
      return
    }
    processing.value = true
    validationError.value = {}
    await axios
      .post('api/login', loginForm)
      .then(async response => {
        //store user
        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
        await auth.getUser()
        //get user
        //update ability
        // sweet alert
        //router push
        router.push('/dashboard')
      })
      .catch(error => {
        //print sweet alert
      })
      .finally(() => (processing.value = false))
  }
  const registerForm = reactive({
    name: '',
    email: '',
    password: '',
  })
  const submitRegister = async () => {
    if (processing.value) {
      return
    }
    processing.value = true
    validationError.value = {}
    await axios
      .post('api/register', registerForm)
      .then(async response => {
        //store user
        await auth.getUser()
        //get user
        //update ability
        // sweet alert
        //router push
        router.push('/dashboard')
      })
      .catch(error => {
        if (error.response?.data) {
          validationError.value = error.response.data.errors
        }
      })
      .finally(() => (processing.value = false))
  }
  const logout = async () => {
    if (processing.value) return

    processing.value = true

    axios
      .post('/logout')
      .then(response => {
        user.name = ''
        user.email = ''
        auth.logout()
        router.push({ name: 'auth.login' })
      })
      .catch(error => {
        if (error.response?.data) {
          validationError.value = error.response.data.errors
        }
      })
      .finally(() => {
        processing.value = false
      })
  }

  const getAbilities = async () => {
    await axios.get('/api/abilities').then(response => {
      const permissions = response.data
      const { can, rules } = new AbilityBuilder(createMongoAbility)

      can(permissions)

      ability.update(rules)
    })
  }
  return {
    loginForm,
    submitLogin,
    registerForm,
    submitRegister,
    logout,
    getAbilities,
    validationError,
  }
}
