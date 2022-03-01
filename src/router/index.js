import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "@/views/HomeView";
import LoginView from "@/views/LoginView";
import RegistrationView from "@/views/RegistrationView";
import SearchView from "@/views/SearchView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/registro",
    name: "registro",
    component: RegistrationView,
  },
  {
    path: "/busqueda",
    name: "busqueda",
    component: SearchView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((route) => route.meta.requiresAuth)) {
//     if (!store.state.isLogued) {
//       return false;
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
