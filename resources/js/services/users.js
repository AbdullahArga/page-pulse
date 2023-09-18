import axios from 'axios'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default function usersService() {
  const users = ref([])
  const pagination = ref({})
  const params = ref({})
  const loading = ref(false)
  const router = useRouter()
  const validationError = ref({})

  const initialState = {
    name: '',
    email: '',
    password: '',
  }

  const form = reactive({ ...initialState })
  const reset = () => {
    Object.assign(form, initialState)
  }

  const paramsAsText = computed(() => {
    let paramToText = ''
    if (params.search) {
      if (paramToText != '') {
        paramToText += `&`
      }
      paramToText += `search=${params.search}`
    }
    if (params.email) {
      if (paramToText != '') {
        paramToText += `&`
      }
      paramToText += `email=${params.email}`
    }
    if (params.name) {
      if (paramToText != '') {
        paramToText += `&`
      }
      paramToText += `name=${params.email}`
    }
  })

  const getUsers = () => {
    if (loading.value) return

    loading.value = true

    //get param
    const url = `api/users?${paramsAsText}`
    axios
      .get(url)
      .then(response => {
        //assign value
        users.value = response.data.data
        pagination.value = response.data.links
        console.log(users.value)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        loading.value = false
      })
  }

  const createSubmit = () => {
    if (loading.value) return

    loading.value = true
    axios
      .post('api/users', form)
      .then(response => {
        //print message
        router.push({ name: 'users.list' })
      })
      .catch(error => {
        console.log(error)
        if (error.response?.data) {
          validationError.value = error.response.data.errors
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
  return {
    getUsers,
    users,
    form,
    reset,
    createSubmit,
  }
}
