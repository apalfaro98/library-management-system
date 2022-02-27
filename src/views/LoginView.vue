<template>
  <div class="fondo">
    <v-row>
      <v-col class="col-12 col-sm-6 col-md-5">
        <v-form class="grey lighten-5 pa-14 form">
          <h1 class="mb-5">Biblioteca MFC</h1>
          <v-text-field
            v-model="name"
            :rules="[rules.required, rules.max]"
            :counter="10"
            label="  Nombre de Usuario"
            required
            outlined
            prepend-inner-icon="mdi-account"
            placeholder="Tu nombre de usuario"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            label="Contraseña"
            hint="Al menos 8 caracteres"
            counter
            outlined
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn class="mr-4 px-10 py-3" @click="submit" color="primary" large>
            Entrar
          </v-btn>
        </v-form>
      </v-col>
      <v-col class="d-flex justify-center align-center">
        <div class="d-flex flex-column">
          <v-btn class="mb-2 d-block" color="success" large elevation="15">
            Registrarse
          </v-btn>
          <v-btn
            class="mt-4 d-block white--text"
            color="teal"
            large
            elevation="15"
          >
            Buscar Libros
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { validationMixin } from "vuelidate";
// import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  //   mixins: [validationMixin],
  //   validations: {
  //     name: { required, maxLength: maxLength(10) },
  //   },
  name: "LoginView",
  data() {
    return {
      name: "",
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Requerido.",
        min: (v) => v.length >= 8 || "Se necesita un minimo de 8 caracteres.",
        max: (v) =>
          v.length <= 10 ||
          "El nombre de usuario no puede exceder los 10 caracteres.",
      },
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
  },
};
</script>

<style scoped>
.fondo {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(@/assets/books-background.png);
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
.form {
  height: 100vh;
}
</style>
