import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'users',
          name: 'users.list',
          component: () => import('../pages/user/users.vue'),
          meta: {
            requiresAuth: true,
            permission: 'add_user',
          },
        },
        {
          path: 'create-user',
          component: () => import('../pages/user/create-user.vue'),
          meta: {
            requiresAuth: true,
            permission: 'add_user',
          },
        },
        {
          path: 'update-user/:id',
          component: () => import('../pages/user/update-user.vue'),
          props: true,
          meta: {
            requiresAuth: true,
            permission: 'add_user',
          },
        },
        {
          path: 'articles',
          name: 'articles.list',
          component: () => import('../pages/article/articles.vue'),
          meta: {
            requiresAuth: true,
            permission: 'read_article',
          },
        },
        {
          path: 'create-article',
          component: () => import('../pages/article/create-article.vue'),
          meta: {
            requiresAuth: true,
            permission: 'add_article',
          },
        },
        {
          path: 'update-article/:id',
          component: () => import('../pages/article/update-article.vue'),
          props: true,
          meta: {
            requiresAuth: true,
            permission: 'update_article',
          },
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
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
          meta: {
            is_not_auth: true,
          },
        },
        {
          path: 'register',
          name: 'auth.register',
          component: () => import('../pages/register.vue'),
          meta: {
            is_not_auth: true,
          },
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/main.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../pages/home.vue'),
          meta: {
            is_not_auth: true,
          },
        },
        {
          path: 'home/article/:id',
          name: 'article.read',
          component: () => import('../pages/Detail.vue'),
          props: true,
          meta: {
            is_not_auth: true,
          },
        },
      ],
    },
  ],
})

export default router
