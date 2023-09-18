<script setup>
import usersService from '@service/users'
import avatar1 from '@images/avatars/avatar-1.png'

const { getUsers, users } = usersService()

getUsers()
</script>

<template>
  <VCard class="mb-4">
    <VCardText>
      <VBtn
        class=""
        to="/create-user"
        >{{ $t('new_user') }}</VBtn
      >
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
              </tr>
            </tbody>
          </VTable>

          <!-- End Table -->
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
