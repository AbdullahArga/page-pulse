import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    users: 'Users',
    new_user: 'New User',
    name: 'Name',
    password: 'Password',
    enter_password: 'Enter Password',
    enter_name: 'Enter Name',
    nav: {
      users: 'Users',
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
