import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import WelcomeBoard from '../views/WelcomeBoard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: WelcomeBoard,
  },
  {
    path: '/setup',
    component: () => import('../views/MatchSetup'),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
