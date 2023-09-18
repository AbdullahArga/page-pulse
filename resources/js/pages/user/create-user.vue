<script setup>
import usersService from '@service/users'

const { form, reset, validationError, createSubmit } = usersService()
</script>

<template>
  <VCard
    :title="$t('users')"
    class="v-col-8 offset-2"
  >
    <VCardText>
      <VRow>
        <VCol>
          <VForm @submit.prevent="createSubmit">
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="form.name"
                  :label="$t('name')"
                  :placeholder="$t('enter_name')"
                />
                <!-- Validation Errors -->
                <div class="text-error mt-1">
                  <div v-for="message in validationError?.name">
                    {{ message }}
                  </div>
                </div>
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  :label="$t('email')"
                  type="email"
                  :placeholder="$t('enter_email')"
                />
                <!-- Validation Errors -->
                <div class="text-error mt-1">
                  <div v-for="message in validationError?.email">
                    {{ message }}
                  </div>
                </div>
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  :label="$t('password')"
                  type="password"
                  :placeholder="$t('enter_password')"
                />
                <!-- Validation Errors -->
                <div class="text-error mt-1">
                  <div v-for="message in validationError?.password">
                    {{ message }}
                  </div>
                </div>
              </VCol>

              <VCol
                cols="12"
                class="d-flex gap-4"
              >
                <VBtn type="submit"> Submit </VBtn>

                <VBtn
                  @click="reset"
                  type="reset"
                  color="secondary"
                  variant="tonal"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
