<script setup>
import home from '@images/home.png'
import no_article_image from '@images/no-article.png'
import useArticle from '@service/articles'

const { getAllActiveArticles, articles, pagination } = useArticle()

getAllActiveArticles()
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
      <VRow v-if="articles && articles.length == 0">
        <VImg
          height="500"
          :src="no_article_image"
        />
      </VRow>
      <VRow
        class="v-col-10 offset-1"
        v-else
      >
        <VCol
          v-for="(article, key) in articles"
          :key="key"
          cols="4"
          sm="6"
          md="4"
        >
          <VCard>
            <VImg
              :src="home"
              cover
              height="190"
            />

            <VCardText class="position-relative">
              <!-- User Avatar -->
              <VAvatar
                color="primary"
                variant="tonal"
              >
                {{
                  article.user
                    .match(/\b(\w)/g)
                    .join('')
                    .slice(0, 2)
                }}
              </VAvatar>
              <!-- Title, Subtitle & Action Button -->
              <div class="d-flex justify-space-between flex-wrap pt-8">
                <div class="me-2 mb-2">
                  <VCardTitle class="pa-0"> {{ article.title }} </VCardTitle>
                  <VCardSubtitle class="text-caption pa-0"> {{ article.user_name }} </VCardSubtitle>
                </div>
                <VBtn :to="'/home/article/' + article.id">Detail</VBtn>
              </div>

              <!--  Mutual Friends -->
              <div class="d-flex justify-space-between align-center mt-8">
                <span class="font-weight-medium">{{ $t('comments_count') + '(' + article.comments_count + ')' }}</span>
                <span class="font-weight-medium">{{ article.created_at }}</span>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VRow>
    <VRow>
      <VCol cols="12">
        <v-pagination
          v-model="pagination.page"
          @update:modelValue="getArticles"
          :length="pagination.last_page"
          rounded="circle"
        ></v-pagination>
      </VCol>
    </VRow>
  </VCard>
</template>
