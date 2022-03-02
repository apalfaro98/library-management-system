<template>
  <div class="d-flex justify-center align-center padre">
    <div class="contenido pt-6 pl-5">
      <h1>Agregar Libro</h1>
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
        Los libros fueron guardados exitosamente en la base de datos.</v-alert
      >
      <div>
        <v-form class="contenedor" @submit.prevent="agregar()" ref="form">
          <v-row>
            <v-col>
              <label class="font-weight-bold">Título:</label>
              <v-text-field
                v-model="titulo"
                label="Escriba el título del libro"
                placeholder="Escriba el título del libro"
                outlined
                :rules="[rules.required]"
                class="mt-2 campo"
                @focus="quitarError()"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <label class="font-weight-bold">Autor:</label>
              <v-text-field
                v-model="autor"
                label="Escriba el autor del libro"
                placeholder="Escriba el autor del libro"
                outlined
                :rules="[rules.required]"
                class="mt-2 campo"
                @focus="quitarError()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label class="font-weight-bold">Categorías:</label>
              <v-select
                v-model="categoria"
                :items="categorias"
                label="Seleccione una categoría"
                outlined
                :rules="[rules.required]"
                class="mt-2 campo"
                @focus="quitarError()"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <label class="font-weight-bold">Cantidad:</label>
              <v-text-field
                v-model="cantidad"
                label="Entre la cantidad a adicionar"
                placeholder="Entre la cantidad a adicionar"
                outlined
                type="number"
                :min="1"
                :rules="[rules.required]"
                class="mt-2 campo"
                @focus="quitarError()"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="text-center mt-4">
            <v-btn
              class="px-14 py-7 font-weight-bold text-subtitle-1"
              color="primary"
              large
              type="submit"
            >
              Agregar
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AgregarLibrosTab",
  data() {
    return {
      titulo: "",
      autor: "",
      categoria: "",
      cantidad: "",
      error: false,
      errorMessage: "",
      success: false,
      categorias: [
        "Matemática",
        "Física",
        "Ciencias Sociales",
        "Historia",
        "Ingeniería",
      ],
      rules: {
        required: (value) => !!value || "Requerido.",
      },
    };
  },
  methods: {
    agregar() {
      if (!this.titulo || !this.autor || !this.categoria || !this.cantidad) {
        this.error = true;
        this.errorMessage = "Debe rellenar todos los campos.";
      } else if (Number(this.cantidad) < 1) {
        this.error = true;
        this.errorMessage = "La cantidad de libros debe ser mayor que 0.";
      } else {
        //POST al servidor
        this.success = true;
        this.error = false;
        this.$refs.form.reset();
        this.titulo = "";
        this.autor = "";
        this.categoria = "";
        this.cantidad = "";
      }
    },
    quitarError() {
      this.error = false;
      this.success = false;
    },
  },
};
</script>

<style scoped>
.contenido {
  width: 900px;
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
