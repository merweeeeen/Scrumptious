
import {createRouter, createWebHistory} from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import CreatePage from '../pages/CreatePage.vue';

const routes = [
      {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
      },
      {
        path: '/create',
        name: 'CreatePage',
        component: CreatePage,
      }
    ]

const router = createRouter({
    history: createWebHistory('/Scrumptious'),
  routes,
});

export default router;