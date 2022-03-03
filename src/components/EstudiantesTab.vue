<template>
  <div>
    <div class="d-flex align-center">
      <v-select
        class="select mt-4 ml-7"
        :items="carreras"
        label="Carreras"
        append-icon="mdi-filter-menu"
        solo
        dense
      ></v-select>
      <v-select
        class="select mt-4 ml-7"
        :items="anios"
        label="Años"
        append-icon="mdi-filter-menu"
        solo
        dense
      ></v-select>
    </div>
    <div class="d-flex justify-center mt-5">
      <v-data-table
        :headers="headers"
        :items="estudiantes"
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
    this.pedirEstudiantes();
  },
  data() {
    return {
      estudiantes: [],
      carreras: [
        "Ciencia de la Computación",
        "Ingeniería Informática",
        "Licenciatura en Matemática",
        "Licenciatura en Física",
        "Ciencias de la Información",
      ],
      anios: ["1er Año", "2do Año", "3ro Año", "4to Año", "5to Año"],
      headers: [
        { text: "Nombre", align: "start", value: "nombre" },
        { text: "Apellidos", align: "start", value: "apellido" },
        { text: "CI", align: "start", sortable: false, value: "carnet" },
        { text: "Correo", align: "start", sortable: false, value: "email" },
        { text: "Carrera", align: "start", value: "carrera" },
        { text: "Año", align: "start", value: "anio" },
      ],
    };
  },
  methods: {
    pedirEstudiantes() {
      peticiones
        .showStudents()
        .then((resp) => resp.json())
        .then((data) => {
          this.estudiantes = data.estudiantes;
          // if (this.filtro == true) {
          //   if (this.categoria == "Ver todo") return;
          //   this.books = this.books.filter(
          //     (book) => book.categoria == this.categoria
          //   );
          // }
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
