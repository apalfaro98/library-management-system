<template>
  <v-app>
    <v-app-bar class="bar" elevation="7">
      <div class="bar-content d-flex justify-space-between align-center">
        <h2>MFC</h2>
        <span class="boton d-flex align-center">
          <v-avatar color="red">
            <span class="white--text text-h6">Ca</span>
          </v-avatar>
          <p class="ml-3 pr-5 mt-3 text-h6 font-weigth-bold">
            Salir <v-icon>mdi-exit-run</v-icon>
          </p>
        </span>
      </div>
    </v-app-bar>
    <h1>Hola</h1>
  </v-app>
</template>

<style scoped>
.bar {
  max-height: 70px;
}
.bar-content {
  width: 100vw;
  height: 100%;
}
.boton:hover {
  cursor: pointer;
}
</style>
