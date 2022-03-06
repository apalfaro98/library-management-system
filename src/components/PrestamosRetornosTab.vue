<template>
  <div class="d-flex justify-center align-center padre">
    <div>
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
        {{ successMessage }}</v-alert
      >
      <v-row>
        <v-col class="contenido pt-6 pl-5">
          <h2 class="text-center">Préstamo</h2>
          <v-form class="contenedor" @submit.prevent="prestar()" ref="form1">
            <v-col class="pt-0">
              <label class="font-weight-bold">Título del libro:</label>
              <v-autocomplete
                v-model="tituloP"
                placeholder="Escriba el título del libro"
                outlined
                :rules="[rules.required]"
                :items="titulos"
                class="mt-2 campo"
                @focus="quitarError()"
              ></v-autocomplete>
            </v-col>
            <v-col class="pt-0">
              <label class="font-weight-bold">Correo del estudiante:</label>
              <v-autocomplete
                v-model="correoP"
                placeholder="Escriba el correo del estudiante"
                outlined
                :rules="[rules.required, rules.emailEvalP]"
                :items="correos"
                class="mt-2 campo"
                @focus="quitarError()"
              ></v-autocomplete>
            </v-col>
            <div class="text-center">
              <v-btn
                class="px-14 py-7 font-weight-bold text-subtitle-1"
                color="primary"
                large
                type="submit"
              >
                Prestar
              </v-btn>
            </div>
          </v-form>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="contenido pt-6 pl-5">
          <h2 class="text-center">Retorno</h2>
          <v-form class="contenedor" @submit.prevent="retornar()" ref="form2">
            <v-col class="pt-0">
              <label class="font-weight-bold">Título del libro:</label>
              <v-autocomplete
                v-model="tituloR"
                placeholder="Escriba el título del libro"
                outlined
                :rules="[rules.required]"
                :items="titulos"
                class="mt-2 campo"
                @focus="quitarError()"
              ></v-autocomplete>
            </v-col>
            <v-col class="pt-0">
              <label class="font-weight-bold">Correo del estudiante:</label>
              <v-autocomplete
                v-model="correoR"
                placeholder="Escriba el correo del estudiante"
                outlined
                :rules="[rules.required, rules.emailEvalR]"
                :items="correos"
                class="mt-2 campo"
                @focus="quitarError()"
              ></v-autocomplete>
            </v-col>
            <div class="text-center">
              <v-btn
                class="px-14 py-7 font-weight-bold text-subtitle-1"
                color="primary"
                large
                type="submit"
              >
                Retornar
              </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import peticiones from "@/helpers/peticiones.js";
export default {
  name: "AgregarLibrosTab",
  created() {
    this.pedirLibros();
    this.pedirEstudiantes();
  },
  data() {
    return {
      tituloP: "",
      correoP: "",
      tituloR: "",
      correoR: "",
      titulos: [],
      correos: [],
      error: false,
      errorMessage: "",
      success: false,
      successMessage: "",
      emailRegex:
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      rules: {
        required: (value) => !!value || "Requerido.",
        emailEvalP: () =>
          this.isEmailP || "Esta no es una dirección de correo válida",
        emailEvalR: () =>
          this.isEmailR || "Esta no es una dirección de correo válida",
      },
    };
  },
  methods: {
    prestar() {
      if (!this.tituloP || !this.correoP) {
        this.error = true;
        this.errorMessage = "Debe rellenar todos los campos del préstamo.";
      } else if (!this.isEmailP) {
        this.error = true;
        this.errorMessage = "Esta no es una dirección de correo válida.";
      } else {
        //POST al servidor
        peticiones
          .prestarLibro(this.tituloP, this.correoP)
          .then((resp) => resp.json())
          .then((data) => {
            if (data.ok) {
              this.success = true;
              this.successMessage = "El préstamo fue realizado con éxito.";
              this.error = false;
              this.$refs.form1.reset();
              this.tituloP = "";
              this.correoP = "";
            } else {
              if (data.sms.includes("No existe el libro")) {
                this.error = true;
                this.errorMessage =
                  "El libro seleccionado no existe en la base de datos, por favor escriba su titulo de nuevo.";
              } else if (data.sms.includes("No existe estudiante con email")) {
                this.error = true;
                this.errorMessage =
                  "El correo seleccionado no corresponde a ningún estudiante en la base de datos.";
              } else if (data.sms.includes("ya tiene el libro")) {
                this.error = true;
                this.errorMessage = "El estudiante ya posee el libro.";
              } else if (data.sms.includes("no tiene disponibles")) {
                this.error = true;
                this.errorMessage =
                  "Lo sentimos, no quedan ejemplares disponibles.";
              }
            }
          });
      }
    },
    retornar() {
      if (!this.tituloR || !this.correoR) {
        this.error = true;
        this.errorMessage = "Debe rellenar todos los campos del retorno.";
      } else if (!this.isEmailR) {
        this.error = true;
        this.errorMessage = "Esta no es una dirección de correo válida.";
      } else {
        //POST al servidor
        peticiones
          .devolverLibro(this.tituloR, this.correoR)
          .then((resp) => resp.json())
          .then((data) => {
            if (data.ok) {
              this.success = true;
              this.successMessage = "La devolución fue realizada con éxito.";
              this.error = false;
              this.$refs.form2.reset();
              this.tituloR = "";
              this.correoR = "";
            } else {
              if (data.sms.includes("No existe estudiante con email")) {
                this.error = true;
                this.errorMessage =
                  "El correo seleccionado no corresponde a ningún estudiante en la base de datos.";
              } else if (data.sms.includes("no tiene el libro")) {
                this.error = true;
                this.errorMessage =
                  "El estudiante no posee el libro seleccionado.";
              }
            }
          });
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
    pedirEstudiantes() {
      peticiones
        .showStudents()
        .then((resp) => resp.json())
        .then((data) => {
          this.correos = data.estudiantes.map((est) => est.email);
        });
    },
  },
  computed: {
    isEmailP() {
      return this.correoP.match(this.emailRegex) ? true : false;
    },
    isEmailR() {
      return this.correoR.match(this.emailRegex) ? true : false;
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
