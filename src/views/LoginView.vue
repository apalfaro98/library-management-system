<template>
  <div class="fondo"></div>
</template>

<script>
export default {
  name: "LoginView",
};
</script>

<style scoped>
.fondo {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url(@/assets/books-background.png);
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
</style>
