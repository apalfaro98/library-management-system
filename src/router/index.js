import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "@/views/HomeView";
import LoginView from "@/views/LoginView";
import RegistrationView from "@/views/RegistrationView";
import SearchView from "@/views/SearchView";
import ErrorView from "@/views/ErrorView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
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
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: ErrorView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const isAuthenticated = () => {
  return sessionStorage.getItem("logueado");
};

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return next("/login");
  }
  if (from.meta.requiresAuth && isAuthenticated()) {
    return next("/");
  }
  return next();
});

router.afterEach((to) => {
  if (!to.meta.requiresAuth && isAuthenticated()) {
    sessionStorage.removeItem("logueado");
  }
});

export default router;
