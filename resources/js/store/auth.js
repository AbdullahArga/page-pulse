import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { ABILITY_TOKEN } from '@casl/vue'
import { defineStore } from 'pinia'

export const authStore = defineStore('auth', {
  state: () => ({
    user: {},
    authenticated: false,
    ability: inject(ABILITY_TOKEN),
  }),
  getters: {
    isAuthenticated(state) {
      return state.authenticated
    },
    current_user(state) {
      return state.user
    },
  },
  actions: {
    getUser() {
      axios
        .get('api/auth/user')
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
      axios
        .get('/api/abilities')
        .then(response => {
          const permissions = response.data
          const { can, rules } = new AbilityBuilder(createMongoAbility)
          console.log('permissions', permissions)
          can(permissions)
          this.ability.update(rules)
        })
        .catch(error => {
          console.log('error', error)
        })
    },
  },
})
