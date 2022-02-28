<template>
  <div class="fondo d-flex justify-center align-center">
    <v-form
      ref="form"
      class="grey lighten-5 pa-14 form"
      @submit.prevent="registro()"
    >
      <h1 class="mb-5 text-center">Registro de estudiantes</h1>
      <v-alert v-if="error" dense outlined type="error" class="mb-6">
        {{ errorMessage }}
      </v-alert>
      <v-alert v-if="success" dense outlined type="success" class="mb-6">
        Sus datos han sido guardados en la base de datos.
      </v-alert>
      <v-row>
        <v-col>
          <v-text-field
            v-model="nombre"
            :rules="[rules.required]"
            label="Nombre"
            required
            outlined
            placeholder="Entre su nombre"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="apellidos"
            :rules="[rules.required]"
            label="Apellidos"
            required
            outlined
            placeholder="Entre sus apellidos"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="ci"
            :rules="[rules.required, rules.cant, rules.num]"
            :counter="11"
            label="Carnet de Identidad"
            required
            outlined
            placeholder="Entre su número de carnet de identidad"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.emailEval]"
            label="Correo Electrónico"
            required
            outlined
            placeholder="Entre su correo electrónico"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="carrera"
            :items="carreras"
            :rules="[rules.required]"
            label="Carrera"
            outlined
            required
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="anio"
            :items="anios"
            :rules="[rules.required]"
            label="Año"
            outlined
            required
          ></v-select>
        </v-col>
      </v-row>
      <div class="text-center mt-2">
        <v-btn class="px-15 py-6" color="primary" large type="submit">
          Registrarse
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      nombre: "",
      apellidos: "",
      ci: "",
      email: "",
      carrera: "",
      anio: "",
      carreras: [
        "Ciencia de la Computación",
        "Ingeniería Informática",
        "Licenciatura en Matemática",
        "Licenciatura en Física",
        "Ciencias de la Información",
      ],
      anios: ["1er Año", "2do Año", "3ro Año", "4to Año", "5to Año"],
      error: false,
      errorMessage: "",
      success: false,
      numeros: /^([0-9])*$/,
      emailRegex:
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      rules: {
        required: (value) => !!value || "Requerido.",
        cant: (v) => v.length === 11 || "Se necesitan 11 dígitos.",
        num: () =>
          this.isNumber || "Solo se pueden introducir caracteres numéricos",
        emailEval: () =>
          this.isEmail || "Esta no es una direcci'on de correo válida",
      },
    };
  },
  methods: {
    registro() {
      const estaVacio =
        this.nombre.length == 0 ||
        this.apellidos.length == 0 ||
        this.ci.length == 0 ||
        this.email.length == 0 ||
        this.carrera.length == 0 ||
        this.anio.length == 0;

      if (estaVacio) {
        this.error = true;
        this.errorMessage = "Debe rellenar todos los campos";
      } else if (this.ci.length != 11 || !this.isNumber) {
        this.error = true;
        this.errorMessage =
          "El Carnet de Identidad debe tener 11 dígitos numéricos";
      } else if (!this.isEmail) {
        this.error = true;
        this.errorMessage = "Esta no es una dirección de correo válida";
      } else {
        //Un post al servidor
        this.success = true;
        this.error = false;
        this.$refs.form.reset();
        this.nombre = "";
        this.apellidos = "";
        this.ci = "";
        this.email = "";
        this.carrera = "";
        this.anio = "";
        setTimeout(() => (this.success = false), 3000);
      }
    },
  },
  computed: {
    isNumber() {
      return this.ci.match(this.numeros) ? true : false;
    },
    isEmail() {
      return this.email.match(this.emailRegex) ? true : false;
    },
  },
};
</script>

<style scoped>
.form {
  max-width: 600px;
  height: fit-content;
  border-radius: 1rem;
}
</style>
