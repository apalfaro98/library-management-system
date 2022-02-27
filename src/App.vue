<template>
  <v-app>
    <login-view />
  </v-app>
</template>

<script>
import LoginView from "@/views/LoginView.vue";
export default {
  name: "App",
  components: { LoginView },

  data: () => ({
    //
  }),
};
</script>
