import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test.vue')
    },
    {
      path: '/panel/:panelId',
      name: 'panel',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/panel.vue')
    },
    {
      path: '/board/:boardId',
      name: 'board',
      component: () => import('../views/board.vue')
    },
    {
      path: '/boardResize/:boardId',
      name: 'boardResize',
      component: () => import('../views/boardResize.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/notFound.vue') }
  ]
})

export default router
