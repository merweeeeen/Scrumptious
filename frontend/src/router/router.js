
import {createRouter, createWebHistory} from 'vue-router';
import test from '../views/test.vue';
import CreateListing from '../views/CreateListing.vue';
import Login from '../views/Login.vue';

const routes = [
      {
        path: '/',
        name: 'LandingPage',
        component: test,
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