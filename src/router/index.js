import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Meetings from "../views/Meetings.vue";
import Register from "../views/Register.vue";
import CheckIn from "@/views/CheckIn.vue"
import Attendees from "@/views/Attendees.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/meetings",
    name: "Meetings",
    component: Meetings,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/checkin/:userID/:meetingID",
    name: "CheckIn",
    component: CheckIn,
  },
  {
    path: "/attendees/:userID/:meetingID",
    name: "Attendees",
    component: Attendees,
  },

  // https://router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
  // {
  //   path: "*",
  //   redirect: "/"
  // },
  
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
