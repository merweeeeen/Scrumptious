
import {createRouter, createWebHistory} from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
// import CreateListing from '../pages/CreateListing.vue';
import Login from '../pages/Login.vue';

const routes = [
      {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/create',
        name: 'CreatePage',
        component: CreateListing,
      }
    ]

const router = createRouter({
    history: createWebHistory('/Scrumptious'),
  routes,
});

export default router;