<script setup>
import { authStore } from '@/store/auth'
import logo from '@images/logo.svg?raw'
const auth = authStore()
const isAuthenticated = computed(() => {
  return auth.isAuthenticated
})
</script>
<template>
  <div class="layout-wrapper layout-blank">
    <div
      class="bg-background d-flex pa-2 w-100"
      style="position: fixed; z-index: 9999"
    >
      <VCol>
        <RouterLink
          to="/"
          class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
        >
          <div
            class="d-flex"
            v-html="logo"
          ></div>

          <h3 class="font-weight-medium leading-normal text-uppercase">PagePulse</h3>
        </RouterLink>
      </VCol>
      <VCol class="d-flex justify-lg-space-evenly v-col-3 align-center">
        <RouterLink
          v-if="isAuthenticated"
          to="/dashboard"
          class=""
        >
          <h4 class="font-weight-medium leading-normal text-uppercase">Dashboard</h4>
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated"
          to="/login"
          class=""
        >
          <h4 class="font-weight-medium leading-normal text-uppercase">Login</h4>
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated"
          to="/register"
          class=""
        >
          <h4 class="font-weight-medium leading-normal text-uppercase">Sign Up</h4>
        </RouterLink>
      </VCol>
    </div>

    <RouterView />
  </div>
</template>

<style>
.layout-wrapper.layout-blank {
  flex-direction: column;
}
</style>
