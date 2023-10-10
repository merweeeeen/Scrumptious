
import {createRouter, createWebHistory} from 'vue-router';
import test from '../views/test.vue';
import CreateListing from '../views/CreateListing.vue';
import Login from '../views/Login.vue';
import Update from '../views/UpdateListing.vue';


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
      },
      {
        path: '/update',
        name: 'UpdatePage',
        component: Update,
      }
    ]

const router = createRouter({
  history: createWebHistory('/Scrumptious'),
  routes,
});

export default router;