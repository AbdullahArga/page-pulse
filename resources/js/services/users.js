import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default function usersService() {
  const users = ref([])
  const swal = inject('$swal')
  const $t = inject('$t')

  const pagination = reactive({
    page: '',
    total: '',
  })
  const id = ref(null)
  const params = reactive({
    search: '',
    name: '',
    email: '',
  })
  const loading = ref(false)
  const router = useRouter()
  const validationError = ref({})

  const initialState = {
    name: '',
    email: '',
    password: '',
    role_id: '',
  }

  const form = reactive({ ...initialState })
  const reset = () => {
    Object.assign(form, initialState)
  }

  const paramsAsText = computed(() => {
    let paramToText = ''
    if (params.search) {
      if (paramToText != '') {
        paramToText = `${paramToText}&`
      }
      paramToText = `${paramToText}search=${params.search}`
    }
    if (params.email) {
      if (paramToText != '') {
        paramToText = `${paramToText}&`
      }
      paramToText = `${paramToText}email=${params.email}`
    }
    if (params.name) {
      if (paramToText != '') {
        paramToText = `${paramToText}&`
      }
      paramToText = `${paramToText}name=${params.email}`
    }
    if (pagination.page) {
      if (paramToText != '') {
        paramToText = `${paramToText}&`
      }
      paramToText = `${paramToText}page=${pagination.page}`
    }

    return paramToText
  })

  const getUsers = () => {
    if (loading.value) return

    loading.value = true

    //get param
    const url = `api/users?${paramsAsText.value}`
    axios
      .get(url)
      .then(response => {
        //assign value
        users.value = response.data.data
        pagination.page = response.data.meta.current_page
        pagination.last_page = response.data.meta.last_page
        pagination.total = response.data.meta.total
        console.log(users.value)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        loading.value = false
      })
  }
  const editUsers = function (currentId) {
    if (loading.value) return

    loading.value = true

    id.value = currentId
    //get param
    const url = `/api/users/${currentId}`
    axios
      .get(url)
      .then(response => {
        Object.assign(form, response.data)
      })
      .catch(error => {
        console.log('edit user', error)
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
        swal.fire('User Created', 'operation accomplished successfully', 'success')

        router.push({ name: 'users.list' })
      })
      .catch(error => {
        if (error.response?.data) {
          validationError.value = error.response.data.errors
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
  const updateSubmit = () => {
    if (loading.value) return

    let data = {}

    data.name = form.name
    data.id = id.value
    if (form.password) data.password = form.password

    loading.value = true
    axios
      .put('/api/users/' + form.id, data)
      .then(response => {
        //print message
        swal.fire('User Updated', 'operation accomplished successfully', 'success')

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

  const destroy = userId => {
    if (loading.value) return

    swal
      .fire({
        title: 'Confirm',
        text: 'Do you want to confirm this operation?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete',
      })
      .then(result => {
        if (result.isConfirmed) {
          loading.value = true
          axios
            .delete('/api/users/' + userId)
            .then(response => {
              swal.fire('Deleted!', 'operation accomplished successfully', 'success')
              //refresh
              getUsers()
            })
            .catch(error => {
              console.log(error)
            })
            .finally(() => {
              loading.value = false
            })
        }
      })
  }
  const roles = ref([])
  const getRoles = () => {
    loading.value = true
    axios
      .get('api/roles')
      .then(response => {
        roles.value = response.data.data
      })
      .catch(error => {
        console.log('roles', error)
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
    pagination,
    updateSubmit,
    editUsers,
    destroy,
    router,
    params,
    roles,
    getRoles,
  }
}
