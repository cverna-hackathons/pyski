import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import WelcomeBoard from '../views/WelcomeBoard';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: WelcomeBoard,
  },
  {
    path: '/setup',
    component: () => import('../views/MatchSetup'),
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/signup',
    component: () => import('../views/Signup.vue'),
  },
  {
    path: '/match/:matchId',
    component: () => import('../views/Match.vue'),
  },
  {
    path: '/matches',
    component: () => import('../views/Matches.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
