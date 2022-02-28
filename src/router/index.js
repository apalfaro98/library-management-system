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

export default router;
