<template>
  <div class="d-flex justify-center align-center text-center">
    <div>
      <img
        src="@/assets/error_image.svg"
        alt="error"
        width="300px"
        height="300px"
      />
      <h1>Página no encontrada.</h1>
      <p class="font-weight-bold text--secondary">
        Por favor retorne a la página principal.
      </p>
      <v-btn
        color="primary"
        class="font-weight-black py-6 px-10 mt-5"
        @click="regresar()"
        >Regresar</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorView",
  methods: {
    regresar() {
      this.$router.push("/login");
    },
  },
};
</script>
