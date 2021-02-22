import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import WelcomeBoard from '../views/WelcomeBoard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: WelcomeBoard,
  },
  {
    path: '/setup',
    component: () => import('../views/MatchSetup.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
