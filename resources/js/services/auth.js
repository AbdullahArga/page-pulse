import { authStore } from '@/store/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const user = reactive({
  name: '',
  email: '',
})
export default function authService() {
  const auth = authStore()

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
        localStorage.setItem('access_token', response.data.token)
        const token = localStorage.getItem('access_token')
        window.axios.defaults.headers.common = {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          Authorization: `Bearer ${token}`,
        }
        await auth.getUser()
        //get user
        //update ability
        await auth.getAbilities()
        // sweet alert
        //router push
        router.push('/dashboard')
      })
      .catch(error => {
        console.log(error)
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
        router.push({ name: 'auth.login' })

        // localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
        // ability.update(userAbilities)
        // localStorage.setItem('userData', JSON.stringify(userData))
        // localStorage.setItem('accessToken', JSON.stringify(accessToken))
        // //store user
        // await auth.getUser()
        // //get user
        // //update ability
        // await auth.getAbilities()
        // // sweet alert
        // //router push
        // router.push('/dashboard')
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
        console.log('logout', error)
      })
      .finally(() => {
        processing.value = false
      })
  }

  return {
    loginForm,
    submitLogin,
    registerForm,
    submitRegister,
    logout,
    validationError,
  }
}
