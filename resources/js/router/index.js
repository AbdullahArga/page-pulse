import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'users',
          name: 'users.list',
          component: () => import('../pages/user/users.vue'),
        },
        {
          path: 'create-user',
          component: () => import('../pages/user/create-user.vue'),
        },
        {
          path: 'update-user/:id',
          component: () => import('../pages/user/update-user.vue'),
          props: true,
        },
        {
          path: 'articles',
          name: 'articles.list',
          component: () => import('../pages/article/articles.vue'),
        },
        {
          path: 'create-article',
          component: () => import('../pages/article/create-article.vue'),
        },
        {
          path: 'update-article/:id',
          component: () => import('../pages/article/update-article.vue'),
          props: true,
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          name: 'auth.login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          name: 'auth.register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router
