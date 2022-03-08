<template>
  <div>
    <div class="d-flex align-center">
      <v-select
        v-model="carrera"
        class="select mt-7 ml-7"
        :items="carreras"
        label="Carreras"
        append-icon="mdi-filter-menu"
        solo
        dense
        @change="filtrarCarrera()"
      ></v-select>
      <v-select
        v-model="anio"
        class="select mt-7 ml-7"
        :items="anios"
        label="Años"
        append-icon="mdi-filter-menu"
        solo
        dense
        @change="filtrarAnio()"
      ></v-select>
    </div>
    <div class="d-flex justify-center mt-5">
      <v-data-table
        :headers="headers"
        :items="estudiantes"
        item-key="email"
        selectable-key="email"
        :items-per-page="6"
        :footer-props="{
          'items-per-page-options': [6],
        }"
        class="elevation-3 tabla"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.nombre }}</td>
            <td>{{ row.item.apellido }}</td>
            <td>{{ row.item.carnet }}</td>
            <td>{{ row.item.email }}</td>
            <td>{{ row.item.carrera }}</td>
            <td>{{ row.item.anio }}</td>
            <td class="d-flex justify-start">
              <v-icon @click="showDialog(row.item)">mdi-delete</v-icon>
            </td>
          </tr>
        </template></v-data-table
      >
    </div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card class="pb-5">
          <v-card-title class="text-h5 grey lighten-1">
            Eliminar Estudiante
          </v-card-title>
          <v-card-text class="pt-8">
            Realmente desea eliminar todos los datos pertenecientes al
            estudiante seleccionado.
          </v-card-text>

          <!-- <v-divider></v-divider> -->

          <v-card-actions class="pt-5">
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              class="font-weight-bold mr-2"
              @click="borrar()"
            >
              Eliminar
            </v-btn>
            <v-btn
              color="normal"
              class="font-weight-bold"
              @click="dialog = false"
            >
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      carrera: "",
      anio: "",
      filtroC: false,
      filtroA: false,
      dialog: false,
      emailDelete: "",
      carreras: [
        "Ciencia de la Computación",
        "Ingeniería Informática",
        "Licenciatura en Matemática",
        "Licenciatura en Física",
        "Ciencias de la Información",
        "Ver todas",
      ],
      anios: [
        "1er Año",
        "2do Año",
        "3ro Año",
        "4to Año",
        "5to Año",
        "Ver todos",
      ],
      headers: [
        { text: "Nombre", align: "start", value: "nombre" },
        { text: "Apellidos", align: "start", value: "apellido" },
        { text: "CI", align: "start", sortable: false, value: "carnet" },
        { text: "Correo", align: "start", sortable: false, value: "email" },
        { text: "Carrera", align: "start", value: "carrera" },
        { text: "Año", align: "start", value: "anio" },
        { text: "Borrar", align: "start" },
      ],
    };
  },
  methods: {
    filtrarCarrera() {
      this.filtroC = true;
      this.pedirEstudiantes();
    },
    filtrarAnio() {
      this.filtroA = true;
      this.pedirEstudiantes();
    },
    pedirEstudiantes() {
      peticiones
        .showStudents()
        .then((resp) => resp.json())
        .then((data) => {
          this.estudiantes = data.estudiantes;
          if (this.filtroC == true) {
            if (!this.carrera.includes("Ver todas")) {
              this.estudiantes = this.estudiantes.filter(
                (est) => est.carrera == this.carrera
              );
            }
          }
          if (this.filtroA == true) {
            if (!this.anio.includes("Ver todos")) {
              this.estudiantes = this.estudiantes.filter(
                (est) => est.anio == this.anio
              );
            }
          }
        });
    },
    showDialog(item) {
      this.dialog = true;
      this.emailDelete = item.email;
    },
    borrar() {
      console.log(this.emailDelete);
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.select {
  max-width: 150px;
}
.tabla {
  width: 1000px;
}
</style>
