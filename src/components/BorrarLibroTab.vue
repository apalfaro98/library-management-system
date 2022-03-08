<template>
  <div class="d-flex justify-center align-center padre">
    <div class="contenido py-6 px-5">
      <h1 class="text-center">Eliminar Libros</h1>
      <v-alert
        transition="slide-x-reverse-transition"
        :value="error"
        border="right"
        prominent
        type="error"
        dismissible
        width="300px"
        class="py-8 font-weight-bold alerta"
        >{{ errorMessage }}</v-alert
      >
      <v-alert
        transition="slide-x-reverse-transition"
        :value="success"
        border="right"
        prominent
        type="success"
        dismissible
        width="350px"
        class="py-8 font-weight-bold alerta"
      >
        Los ejemplares fueron eliminados exitosamente de la base de
        datos.</v-alert
      >
      <div class="d-flex justify-center">
        <v-form class="contenedor" @submit.prevent="borrar()" ref="form">
          <v-col>
            <label class="font-weight-bold">Título:</label>
            <v-autocomplete
              v-model="titulo"
              placeholder="Escriba el título del libro"
              outlined
              :rules="[rules.required]"
              :items="titulos"
              class="mt-2 campo"
              @focus="quitarError()"
            ></v-autocomplete>

            <label class="font-weight-bold">Cantidad:</label>
            <v-text-field
              v-model="cantidad"
              placeholder="Entre la cantidad a adicionar"
              outlined
              type="number"
              :min="1"
              :rules="[rules.required]"
              class="mt-2 campo"
              @focus="quitarError()"
            ></v-text-field>
          </v-col>
          <div class="text-center">
            <v-btn
              class="px-14 py-7 font-weight-bold text-subtitle-1"
              color="primary"
              large
              type="submit"
            >
              Borrar
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import peticiones from "@/helpers/peticiones";
export default {
  name: "BorrarLibroTab",
  data() {
    return {
      titulo: "",
      cantidad: "",
      titulos: [],
      error: false,
      errorMessage: "",
      success: false,
      rules: {
        required: (value) => !!value || "Requerido.",
      },
    };
  },
  created() {
    this.pedirLibros();
  },
  methods: {
    borrar() {
      if (!this.titulo || !this.cantidad) {
        this.error = true;
        this.errorMessage = "Debe rellenar todos los campos.";
      } else if (Number(this.cantidad) < 1) {
        this.error = true;
        this.errorMessage = "La cantidad de libros debe ser mayor que 0.";
      } else {
        //POST al servidor
        // peticiones
        //   .addBook(
        //     this.titulo,
        //     this.autor,
        //     this.categoria,
        //     Number(this.cantidad)
        //   )
        //   .then((res) => res.json())
        //   .then((data) => {
        //     if (data.ok) {
        this.success = true;
        this.error = false;
        this.$refs.form.reset();
        this.titulo = "";
        this.autor = "";
        this.categoria = "";
        this.cantidad = "";
        //     }
        //   })
        //   .catch(() => {
        //     this.error = true;
        //     this.errorMessage =
        //       "No se ha podido realizar la conexión con el servidor.";
        //   });
      }
    },
    quitarError() {
      this.error = false;
      this.success = false;
    },
    pedirLibros() {
      peticiones
        .showBooks()
        .then((resp) => resp.json())
        .then((data) => {
          this.titulos = data.books.map((book) => book.titulo);
        });
    },
  },
};
</script>

<style scoped>
.contenido {
  width: 400px;
  height: 450px;
  background-color: #fff;
  border-radius: 1rem;
}
.padre {
  height: 100%;
}
.contenedor {
  max-width: 700px;
  margin: 2rem auto;
}
.campo {
  width: 300px;
}
.rojo {
  color: red;
}
.alerta {
  position: absolute;
  right: 0;
  top: 90px;
}
</style>
