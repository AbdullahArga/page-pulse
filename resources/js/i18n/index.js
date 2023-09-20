import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    users: 'Users',
    articles: 'Articles',
    new_user: 'New User',
    name: 'Name',
    password: 'Password',
    enter_password: 'Enter Password',
    enter_name: 'Enter Name',
    total: 'Total',
    confirm_msg_title_delete: 'Confirm',
    confirm_msg_body_delete: 'Do you want to confirm this operation?',
    delete: 'Delete',
    deleted: 'Deleted!',
    operation_successfully: 'operation accomplished successfully',
    roles: 'Roles',
    permissions: 'Permissions',
    new_article: 'New Article',
    edit_article: 'Edit Article',
    comments_count: 'Comments',
    new_tag: 'New Tag',
    nav: {
      users: 'Users',
      articles: 'Articles',
    },
  },
}
export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE, // <--- 1
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE, // <--- 2
  legacy: false, // <--- 3
  globalInjection: true,
  messages,
})
