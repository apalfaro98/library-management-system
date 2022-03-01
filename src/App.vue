<template>
  <v-app @ruta="checkLogin()">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  created() {
    this.checkLogin();
  },

  data: () => ({
    isLogued: sessionStorage.getItem("logueado") == "ok" ? true : false,
  }),
  methods: {
    checkLogin() {
      if (this.isLogued) {
        this.$router.push("/home");
      } else if (this.$route.path.includes("home")) {
        this.$router.push("/");
      }
    },
  },
  watch: {
    $route: "checkLogin",
  },
};
</script>
