<script setup>
import usersService from '@service/users'

const { getUsers, users, pagination, destroy, params } = usersService()

getUsers()
</script>

<template>
  <VCard class="mb-4">
    <VCardText>
      <VRow>
        <VCol>
          <VBtn
            class=""
            to="/create-user"
            >{{ $t('new_user') }}</VBtn
          >
        </VCol>
        <VCol>
          <VTextField
            @keyup.enter="getUsers()"
            v-model="params.search"
            prepend-inner-icon="mdi-magnify"
            :label="$t('search')"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
  <VCard :title="$t('users')">
    <VCardText>
      <VRow>
        <VCol cols="12">
          <!-- Table -->
          <VTable
            height="500"
            fixed-header
          >
            <thead>
              <tr>
                <th class="text-uppercase">{{ $t('avatar') }}</th>
                <th class="text-uppercase">{{ $t('name') }}</th>
                <th class="text-uppercase">{{ $t('email') }}</th>
                <th class="text-uppercase">{{ $t('roles') }}</th>
                <th class="text-uppercase">{{ $t('permissions') }}</th>
                <th class="text-uppercase">{{ $t('actions') }}</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="user in users"
                :key="user.id"
              >
                <td>
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    {{
                      user.name
                        .match(/\b(\w)/g)
                        .join('')
                        .slice(0, 2)
                    }}
                  </VAvatar>
                </td>
                <td class="">
                  {{ user.name }}
                </td>
                <td class="">
                  {{ user.email }}
                </td>
                <td class="">
                  <v-chip
                    v-for="role in user.roles"
                    :key="role.id"
                  >
                    {{ role.name }}
                  </v-chip>
                </td>
                <td>
                  <v-chip
                    class="bg-secondary"
                    v-for="permission in user.permissions"
                    :key="permission.id"
                  >
                    {{ permission.permissions }}
                  </v-chip>
                </td>
                <td class="">
                  <VBtn
                    icon
                    class="mr-4 bg-warning"
                    size="small"
                    :to="'/update-user/' + user.id"
                  >
                    <VIcon icon="mdi-pencil-outline" />
                  </VBtn>
                  <VBtn
                    icon
                    class="bg-error"
                    @click="destroy(user.id)"
                    size="small"
                  >
                    <VIcon icon="mdi-close-outline" />
                  </VBtn>
                </td>
              </tr>
            </tbody>
          </VTable>

          <!-- End Table -->
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="6">
          <p class="text-subtitle-1">{{ $t('total') + ' : ' + pagination.total }}</p>
        </VCol>
        <VCol cols="6">
          <v-pagination
            v-model="pagination.page"
            @update:modelValue="getUsers"
            :length="pagination.last_page"
            rounded="circle"
          ></v-pagination>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
