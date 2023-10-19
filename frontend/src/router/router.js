import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import CreateListing from "../views/CreateListing.vue";
import ListingPage from "../views/ListingPage.vue";
import Login from "../views/Login.vue";
import Test from '../views/Test.vue'
import authGuard from "./authGuard";
import Update from "../views/updateListing.vue"

const routes = [
  {
    path: "/:skills?/:vacancy?/:dept?/:roleName?",
    name: "LandingPage",
    component: LandingPage,
    beforeEnter: authGuard
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/create",
    name: "CreatePage",
    component: CreateListing,
    beforeEnter: authGuard
  },
  {
    path: "/listing/:listing_id",
    name: "ListingPage",
    component: ListingPage,
    beforeEnter: authGuard
  },
  {
    path: '/update/:listing_id',
    name: 'UpdatePage',
    component: Update,
    beforeEnter: authGuard
  }
];

const router = createRouter({
  history: createWebHistory("/Scrumptious"),
  routes,
});

export { routes };

export default router;
