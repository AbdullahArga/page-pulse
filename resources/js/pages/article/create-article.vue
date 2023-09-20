<script setup>
import usersService from '@service/users'
import useArticle from '@service/articles'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ref } from 'vue'

const { form, reset, validationError, createArticleSubmit } = useArticle()

const tags = ref([])

if (form.tags)
  tags.value = form.tags
    .split(',')
    .map(item => item.toLowerCase().split(' ').join('_'))
    .map(item => `${item}`)

const new_tag = ref('')
const appendTag = () => {
  if (new_tag.value) {
    tags.value.push('#' + new_tag.value)
    new_tag.value = ''
    form.tags = tags.value.length ? tags.value.join(',') : ''
  }
}
const removeTag = index => {
  tags.value.splice(index, 1)
  form.tags = tags.value.length ? tags.value.join(',') : ''
}
</script>

<template>
  <VCard
    :title="$t('new_article')"
    class="v-col-12"
  >
    <VCardText>
      <VRow>
        <VCol>
          <VForm @submit.prevent="createArticleSubmit">
            <VRow>
              <VCol cols="6">
                <VTextField
                  v-model="form.title"
                  :label="$t('title')"
                />
                <!-- Validation Errors -->
                <div class="text-error mt-1">
                  <div v-for="message in validationError?.title">
                    {{ message }}
                  </div>
                </div>
              </VCol>
              <VCol cols="6">
                <VTextField
                  @keyup.space="appendTag"
                  v-model="new_tag"
                  :label="$t('new_tag')"
                  placeholder="press space to append your tag"
                />
                <VChip
                  @click="removeTag(index)"
                  v-for="(tag, index) in tags"
                  :key="index"
                >
                  {{ tag }}
                </VChip>
                <!-- Validation Errors -->
                <div class="text-error mt-1">
                  <div v-for="message in validationError?.tags">
                    {{ message }}
                  </div>
                </div>
              </VCol>
              <VCol cols="12">
                <quill-editor
                  content-type="html"
                  theme="snow"
                  v-model:content="form.content"
                ></quill-editor>
                <!-- Validation Errors -->
                <div class="text-error mt-1">
                  <div v-for="message in validationError?.content">
                    {{ message }}
                  </div>
                </div>
              </VCol>
              <VCol
                cols="6"
                class="d-flex gap-4 mt-12"
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
