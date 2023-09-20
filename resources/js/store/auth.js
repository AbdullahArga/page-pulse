import { defineStore } from 'pinia'

export const authStore = defineStore('auth', {
  state: () => ({
    user: {},
    permissions: [],
  }),
  getters: {
    async isAuthenticated(state) {
      await this.getUser()
      return state.authenticated
    },

    current_user(state) {
      if (!state.user) return {}
      return state.user
    },
    getPermissions(state) {
      this.getAbilities()
      return JSON.parse(JSON.stringify(state.permissions))
    },
  },
  actions: {
    getUser() {
      if (!this.user.id)
        axios
          .get('api/user')
          .then(({ data }) => {
            this.user = data
            this.authenticated = true
          })
          .catch(error => {
            console.log(error)
            this.user = {}
            this.authenticated = false
          })
    },

    logout() {
      this.user = {}
      this.authenticated = false
    },
    getAbilities() {
      if (this.permissions.length) {
        return
      }

      axios
        .get('/api/abilities')
        .then(response => {
          this.permissions = response.data
        })
        .catch(error => {
          console.log('error', error)
        })
    },
  },
})
