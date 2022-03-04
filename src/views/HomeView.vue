<template>
  <v-app>
    <v-app-bar class="bar" elevation="1" color="white">
      <div class="bar-content d-flex justify-end">
        <span
          class="boton d-flex align-center pl-4 rounded-xl"
          @click="salir()"
        >
          <v-avatar color="accent" size="40">
            <v-icon dark> mdi-account-circle </v-icon>
          </v-avatar>
          <p class="ml-3 pr-5 mt-3 text-h6 font-weigth-bold">
            Salir <v-icon>mdi-exit-to-app</v-icon>
          </p>
        </span>
      </div>
    </v-app-bar>
    <v-card width="300" tile class="menu" elevation="1">
      <h2 class="pt-5 pb-10 text-center">Biblioteca</h2>
      <v-navigation-drawer permanent width="300">
        <v-list nav>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <div class="contenido">
      <principal-tab v-if="selectedItem == 0" />
      <libros-tab v-else-if="selectedItem == 1" />
      <estudiantes-tab v-else-if="selectedItem == 2" />
      <agregar-libros v-else-if="selectedItem == 3" />
      <prestamos-retornos-tab v-else />
    </div>
  </v-app>
</template>

<script>
import PrincipalTab from "@/components/PrincipalTab.vue";
import LibrosTab from "@/components/LibrosTab.vue";
import EstudiantesTab from "@/components/EstudiantesTab.vue";
import AgregarLibros from "@/components/AgregarLibrosTab.vue";
import PrestamosRetornosTab from "@/components/PrestamosRetornosTab.vue";
export default {
  name: "HomeView",
  components: {
    PrincipalTab,
    LibrosTab,
    EstudiantesTab,
    AgregarLibros,
    PrestamosRetornosTab,
  },
  data() {
    return {
      selectedItem: 0,
      items: [
        { text: "Principal", icon: "mdi-star" },
        { text: "Libros", icon: "mdi-book-multiple" },
        { text: "Estudiantes", icon: "mdi-account-group" },
        { text: "Agregar Libros", icon: "mdi-book-plus-multiple" },
        { text: "Préstamos y Retornos", icon: "mdi-book-account" },
      ],
    };
  },
  methods: {
    salir() {
      sessionStorage.removeItem("logueado");
      this.$router.push("/login");
    },
  },
};
</script>

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
  background-color: #e3f2fd;
}
.menu {
  position: absolute;
  left: 0;
  top: 0;
  height: 83vh;
}
.contenido {
  background-color: #f5f5f5;
  height: 100%;
  padding-left: 300px;
}
</style>
