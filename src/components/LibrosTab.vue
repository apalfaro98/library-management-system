<template>
  <div>
    <div class="d-flex align-center justify-start">
      <v-select
        v-model="categoria"
        class="select mt-4 ml-7"
        :items="categorias"
        label="Categorías"
        append-icon="mdi-filter-menu"
        solo
        dense
        @change="filtrar"
      ></v-select>
    </div>
    <div class="d-flex justify-center mt-5">
      <v-data-table
        :headers="headers"
        :items="books"
        :items-per-page="5"
        :footer-props="{
          'items-per-page-options': [5],
        }"
        class="elevation-1 tabla"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
import peticiones from "@/helpers/peticiones.js";
export default {
  name: "LibrosTab",
  created() {
    this.pedirLibros();
  },
  data() {
    return {
      books: [],
      categoria: "",
      filtro: false,
      categorias: [
        "Matematica",
        "Fisica",
        "Ciencias Sociales",
        "Historia",
        "Ingenieria",
        "Ver todo",
      ],
      headers: [
        { text: "Título", align: "start", value: "titulo" },
        { text: "Autor", align: "start", value: "autor" },
        { text: "Categoría", align: "start", value: "categoria" },
        { text: "Disponibles", align: "start", value: "disponible" },
        { text: "Total", align: "start", value: "cantidad" },
      ],
    };
  },
  methods: {
    filtrar() {
      this.filtro = true;
      this.pedirLibros();
    },
    pedirLibros() {
      peticiones
        .showBooks()
        .then((resp) => resp.json())
        .then((data) => {
          this.books = data.books;
          if (this.filtro == true) {
            if (this.categoria == "Ver todo") return;
            this.books = this.books.filter(
              (book) => book.categoria == this.categoria
            );
          }
        });
    },
  },
};
</script>

<style scoped>
.select {
  max-width: 150px;
}
.tabla {
  width: 800px;
}
</style>
