<template>
  <div>
    <div class="d-flex justify-center">
      <div class="mt-15">
        <p v-if="texto" class="font-weight-bold pl-2">
          Introduzca <span v-if="tab == 'libro'">el título del libro</span
          ><span v-else-if="tab == 'estudiante'">el nombre del estudiante</span
          ><span v-else-if="tab == 'prestamo'"
            >el correo del estudiante para verificar los libros que posee el
            mismo</span
          >
          :
        </p>
        <v-text-field
          class="input flex-grow-0"
          v-model="search"
          solo
          rounded
          :append-icon="fueBuscado ? 'mdi-window-close' : 'mdi-magnify'"
          height="1.5rem"
          @click:append="elegir()"
          @keypress.enter="elegir()"
        ></v-text-field>
      </div>
    </div>
    <div v-if="texto" class="d-flex justify-center mt-3">
      <v-data-table
        v-if="mostrarTabla"
        :headers="tab == 'libro' ? headersLA : headersE"
        :items="tab == 'libro' ? books : estudiantes"
        :items-per-page="5"
        :footer-props="{
          'items-per-page-options': [5],
        }"
        class="elevation-1 tabla"
      ></v-data-table>
    </div>
    <div v-else class="d-flex justify-center mt-8">
      <v-data-table
        v-if="mostrarTabla"
        :headers="headersLE"
        :items="books"
        :items-per-page="6"
        :footer-props="{
          'items-per-page-options': [6],
        }"
        class="elevation-1 tabla"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
import peticiones from "@/helpers/peticiones";
export default {
  name: "BuscarTabla",
  props: {
    texto: {
      type: Boolean,
      default: false,
    },
    tab: {
      type: String,
    },
  },
  created() {
    this.pedirLibros();
    this.pedirEstudiantes();
  },
  data() {
    return {
      search: "",
      fueBuscado: false,
      mostrarTabla: false,
      books: [],
      estudiantes: [],
      headersLA: [
        { text: "Título", align: "start", value: "titulo" },
        { text: "Autor", align: "start", value: "autor" },
        { text: "Categoría", align: "start", value: "categoria" },
        { text: "Disponible", align: "start", value: "disponible" },
        { text: "Total", align: "start", value: "cantidad" },
      ],
      headersLE: [
        { text: "Título", align: "start", value: "titulo" },
        { text: "Autor", align: "start", value: "autor" },
        { text: "Categoría", align: "start", value: "categoria" },
        { text: "Disponible", align: "center", value: "disponible" },
      ],
      headersE: [
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
    elegir() {
      if (!this.fueBuscado) {
        this.busqueda();
        this.fueBuscado = true;
      } else {
        this.search = "";
        this.fueBuscado = false;
        this.mostrarTabla = false;
        this.pedirLibros();
        this.pedirEstudiantes();
      }
    },
    busqueda() {
      if (this.tab == "libro") {
        this.buscarLibro();
      } else if (this.tab == "estudiante") {
        this.buscarEstudiante();
      }
    },
    buscarLibro() {
      if (this.search.length != 0) {
        this.books = this.books.filter((book) =>
          book.titulo.toLowerCase().includes(this.search.toLowerCase())
        );
        if (!this.texto) {
          this.books.forEach((book) => {
            if (book.disponible == 0) {
              book.disponible = "No Disponible.";
            } else {
              book.disponible = "Disponible.";
            }
          });
        }
        this.mostrarTabla = true;
      }
    },
    buscarEstudiante() {
      if (this.search.length != 0) {
        this.estudiantes = this.estudiantes.filter((est) =>
          est.nombre.toLowerCase().includes(this.search.toLowerCase())
        );
        this.mostrarTabla = true;
      }
    },
    pedirLibros() {
      peticiones
        .showBooks()
        .then((resp) => resp.json())
        .then((data) => {
          this.books = data.books;
        });
    },
    pedirEstudiantes() {
      peticiones
        .showStudents()
        .then((resp) => resp.json())
        .then((data) => {
          this.estudiantes = data.estudiantes;
        });
    },
  },
};
</script>

<style scoped>
.input {
  width: 600px;
  border-width: 2px;
  outline-width: 2px;
  outline-color: black;
}
.tabla {
  width: 1000px;
}
</style>
