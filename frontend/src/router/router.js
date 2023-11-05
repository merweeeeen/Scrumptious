import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import CreateListing from "../views/CreateListing.vue";
import ProfilePage from '../views/PersonalProfile.vue';
import ListingPage from "../views/ListingPage.vue";
import Login from "../views/Login.vue";
import Redirect from '../views/Redirect.vue'
import authGuard from "./authGuard";
import Update from "../views/updateListing.vue"
import StaffProfilePage from "../views/StaffProfilePage.vue"

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
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
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
  },
  {
    path: '/redirect/:page',
    name: 'Redirect',
    component: Redirect
  },
  {
    path: '/staff/:staff_id',
    name: 'StaffProfilePage',
    component: StaffProfilePage,
    beforeEnter: authGuard
  }
];

const router = createRouter({
  history: createWebHistory("/Scrumptious"),
  routes,
});

export { routes };

export default router;
