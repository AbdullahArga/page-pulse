import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default function useArticle() {
  const articles = ref([])
  const swal = inject('$swal')

  const pagination = reactive({
    page: '',
    total: '',
  })
  const id = ref(null)
  const params = reactive({
    search: '',
  })
  const loading = ref(false)
  const router = useRouter()
  const validationError = ref({})

  const canActive = ref(true)

  const initialState = {
    title: '',
    content: '',
    tags: '',
    publish_at: '',
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

    if (pagination.page) {
      if (paramToText != '') {
        paramToText = `${paramToText}&`
      }
      paramToText = `${paramToText}page=${pagination.page}`
    }

    return paramToText
  })

  const getArticles = () => {
    if (loading.value) return

    loading.value = true

    //get param
    const url = `api/articles?${paramsAsText.value}`
    axios
      .get(url)
      .then(response => {
        //assign value
        articles.value = response.data.data
        pagination.page = response.data.meta.current_page
        pagination.last_page = response.data.meta.last_page
        pagination.total = response.data.meta.total
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        loading.value = false
      })
  }
  const destroy = articleId => {
    // if (loading.value) return

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
          // loading.value = true
          axios
            .delete('/api/articles/' + articleId)
            .then(response => {
              //refresh
              getArticles()
              swal.fire('Deleted!', 'operation accomplished successfully', 'success')
            })
            .catch(error => {
              console.log(error)
              swal.fire('Error', "You Don't Have Right Permission", 'error')
            })
            .finally(() => {
              // loading.value = false
            })
        }
      })
  }
  const createArticleSubmit = () => {
    if (loading.value) return

    loading.value = true
    axios
      .post('api/articles', form)
      .then(response => {
        //print message
        swal.fire('Articles Created', 'operation accomplished successfully', 'success')

        router.push({ name: 'articles.list' })
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
  const editArticle = function (currentId) {
    if (loading.value) return

    loading.value = true

    id.value = currentId
    //get param
    const url = `/api/articles/${currentId}`
    axios
      .get(url)
      .then(response => {
        Object.assign(form, response.data.data)
      })
      .catch(error => {
        swal.fire('Error', "You Don't Have Right Permission", 'error')
        router.push({ name: 'articles.list' })
      })
      .finally(() => {
        loading.value = false
      })
  }

  const updateArticleSubmit = () => {
    if (loading.value) return

    let data = Object.assign(form, {})
    data.id = id.value

    loading.value = true
    axios
      .put('/api/articles/' + data.id, data)
      .then(response => {
        //print message
        swal.fire('Article Updated', 'operation accomplished successfully', 'success')

        router.push({ name: 'articles.list' })
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

  const activeSubmit = currentId => {
    if (loading.value) return
    loading.value = true
    axios
      .post('/api/articles/' + currentId + '/active')
      .then(response => {
        //print message
        getArticles()
      })
      .catch(error => {
        console.log(error)
        swal.fire('Error', "You Don't Have Right Permission", 'error')
      })
      .finally(() => {
        loading.value = false
      })
  }
  const inactiveSubmit = currentId => {
    if (loading.value) return
    loading.value = true
    axios
      .post('/api/articles/' + currentId + '/inactive')
      .then(response => {
        //print message
        getArticles()
      })
      .catch(error => {
        swal.fire('Error', "You Don't Have Right Permission", 'error')
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    getArticles,
    articles,
    pagination,
    destroy,
    form,
    reset,
    params,
    canActive,
    validationError,
    createArticleSubmit,
    inactiveSubmit,
    activeSubmit,
    editArticle,
    updateArticleSubmit,
  }
}
