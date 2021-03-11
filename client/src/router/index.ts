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
    path: '/results',
    component: () => import('../views/Results'),
  },
  {
    path: '/match/:matchId',
    component: () => import('../views/Match'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
