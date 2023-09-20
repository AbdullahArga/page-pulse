<script setup>
import { authStore } from '@/store/auth'
import home from '@images/home.png'
import useArticle from '@service/articles'
import { computed } from 'vue'

const auth = authStore()

const props = defineProps({
  id: {
    required: true,
  },
})
const { article, showArticle, createCommentSubmit, commentForm } = useArticle()
auth.getUser()
const user = computed(() => {
  return auth.current_user
})
const isAuthenticated = computed(() => {
  return auth.isAuthenticated
})

showArticle(props.id)
</script>

<template>
  <VCard>
    <VRow>
      <VImg
        :src="home"
        width="100%"
        height="500"
        cover
      />
    </VRow>
    <VRow>
      <VRow class="v-col-10 offset-1">
        <VCol
          cols="12"
          class=""
        >
          <VCard class="pa-4">
            <!-- User Avatar -->
            <VAvatar
              color="primary"
              variant="tonal"
            >
              {{
                article.user
                  ? article.user
                      .match(/\b(\w)/g)
                      .join('')
                      .slice(0, 2)
                  : ''
              }}
            </VAvatar>
            {{ article.user }}
            <div class="me-2 mb-2">
              <VCardTitle class="pa-0"> {{ article.title }} </VCardTitle>
              <VCardSubtitle class="text-caption pa-0"> {{ article.user_name }} </VCardSubtitle>
            </div>
            <VCardText class="position-relative">
              <p v-html="article.content"></p>
              <!--  Mutual Friends -->
              <div class="d-flex justify-space-between align-center mt-8">
                <span class="font-weight-medium">{{ $t('comments_count') + '(' + article.comments_count + ')' }}</span>
                <span class="font-weight-medium">{{ article.created_at }}</span>
              </div>
            </VCardText>
          </VCard>
          <VCard>
            <!-- new comment -->
            <VCard
              v-if="isAuthenticated"
              class="ma-8 pa-4"
            >
              <VForm @submit.prevent="createCommentSubmit(article.id)">
                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model="commentForm.message"
                      :label="$t('message')"
                    />
                    <!-- Validation Errors -->
                    <div class="text-error mt-1">
                      <div v-for="message in validationError?.message">
                        {{ message }}
                      </div>
                    </div>
                  </VCol>
                  <VCol
                    cols="6"
                    class="d-flex gap-4 mt-12"
                  >
                    <VBtn type="submit"> Submit </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCard>
            <!-- comments -->
            <VCard
              class="ma-8 pa-4"
              v-for="(comment, key) in article.comments"
              :key="key"
            >
              <VAvatar
                color="primary"
                variant="tonal"
              >
                {{
                  comment.user
                    ? comment.user
                        .match(/\b(\w)/g)
                        .join('')
                        .slice(0, 2)
                    : ''
                }}
              </VAvatar>
              <VCardText>
                {{ comment.message }}
                <span class="font-weight-medium float-end">{{ comment.created_at_for_human }}</span>
              </VCardText>
            </VCard>
          </VCard>
        </VCol>
      </VRow>
    </VRow>
  </VCard>
</template>
