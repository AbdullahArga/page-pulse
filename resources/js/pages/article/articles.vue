<script setup>
import avatar2 from '@images/avatars/avatar-3.png'
import useArticle from '@service/articles'

import no_article_image from '@images/no-article.png'

const { getArticles, articles, params, destroy, canActive, pagination, activeSubmit, inactiveSubmit } = useArticle()

getArticles()
</script>

<template>
  <VCard class="mb-4">
    <VCardText>
      <VRow>
        <VCol>
          <VBtn
            class=""
            to="/create-article"
            >{{ $t('new_article') }}</VBtn
          >
        </VCol>
        <VCol>
          <VTextField
            @keyup.enter="getArticles()"
            v-model="params.search"
            prepend-inner-icon="mdi-magnify"
            :label="$t('search')"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
  <VCard v-if="articles.length == 0">
    <VImg
      height="500"
      :src="no_article_image"
    />
  </VCard>
  <VCard
    v-else
    :title="$t('articles')"
  >
    <VCardText>
      <VRow>
        <VCol
          v-for="(article, key) in articles"
          :key="key"
          cols="4"
          sm="6"
          md="4"
        >
          <VCard>
            <VImg
              :src="article.image ? article.image : no_article_image"
              height="190"
            />

            <VCardText class="position-relative">
              <!-- User Avatar -->
              <VAvatar
                size="75"
                class="avatar-center"
                :image="avatar2"
              />

              <!-- Title, Subtitle & Action Button -->
              <div class="d-flex justify-space-between flex-wrap pt-8">
                <div class="me-2 mb-2">
                  <VCardTitle class="pa-0"> {{ article.title }} </VCardTitle>
                  <VCardSubtitle class="text-caption pa-0"> {{ article.user_name }} </VCardSubtitle>
                </div>
                <div>
                  <VBtn
                    v-if="article.is_active"
                    :disabled="!canActive"
                    class="mr-1"
                    @click="inactiveSubmit(article.id)"
                    >Active</VBtn
                  >
                  <VBtn
                    v-else
                    class="bg-grey-500 mr-1"
                    :disabled="!canActive"
                    @click="activeSubmit(article.id)"
                    >UnActive</VBtn
                  >
                  <VBtn
                    icon
                    class="mr-1 bg-warning"
                    size="small"
                    v-if="article.is_author"
                    :to="'/update-article/' + article.id"
                  >
                    <VIcon icon="mdi-pencil-outline" />
                  </VBtn>
                  <VBtn
                    icon
                    class="bg-error"
                    v-if="article.is_author"
                    @click="destroy(article.id)"
                    size="small"
                  >
                    <VIcon icon="mdi-close-outline" />
                  </VBtn>
                </div>
              </div>

              <!--  Mutual Friends -->
              <div class="d-flex justify-space-between align-center mt-8">
                <span class="font-weight-medium">{{ $t('comments_count') + '(' + article.comments_count + ')' }}</span>
                <span class="font-weight-medium">{{ article.created_at }}</span>
              </div>
              <div class="">
                <VChip
                  v-for="(tag, key) in article.tags.split(',')"
                  :key="key"
                >
                  {{ tag }}
                </VChip>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="6">
          <p class="text-subtitle-1">{{ $t('total') + ' : ' + pagination.total }}</p>
        </VCol>
        <VCol cols="6">
          <v-pagination
            v-model="pagination.page"
            @update:modelValue="getArticles"
            :length="pagination.last_page"
            rounded="circle"
          ></v-pagination>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
