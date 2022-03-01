import { required } from 'vuelidate/lib/validators';
<template>
  <div class="fondo">
    <v-row class="mb-0">
      <v-col class="col-12 col-sm-6 col-md-5 pb-0">
        <v-form class="grey lighten-5 pa-14 form" @submit.prevent="login">
          <h1 class="mb-5">Biblioteca MFC</h1>
          <v-alert v-if="error" dense outlined type="error" class="mb-6">
            {{ errorMessage }}
          </v-alert>
          <v-text-field
            v-model="user"
            :rules="[rules.required]"
            label="  Nombre de Usuario"
            required
            outlined
            prepend-inner-icon="mdi-account"
            placeholder="Tu nombre de usuario"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            label="Contraseña"
            hint="Al menos 8 caracteres"
            required
            counter
            outlined
            @click:append="show = !show"
          ></v-text-field>

          <v-btn class="mr-4 px-10 py-3" color="primary" large type="submit">
            Entrar
          </v-btn>
        </v-form>
      </v-col>
      <v-col class="d-flex justify-center align-center pb-0">
        <div class="d-flex flex-column">
          <v-btn
            class="mb-2 d-block"
            color="success"
            large
            elevation="15"
            @click="irRegistro()"
          >
            Registrarse
          </v-btn>
          <v-btn
            class="mt-4 d-block white--text"
            color="teal"
            large
            elevation="15"
            @click="irBusqueda()"
          >
            Buscar Libros
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import peticiones from "@/helpers/peticiones";
export default {
  name: "LoginView",
  data() {
    return {
      user: "",
      password: "",
      show: false,
      error: false,
      errorMessage: "",
      rules: {
        required: (value) => !!value || "Requerido.",
        min: (v) => v.length >= 8 || "Se necesita un minimo de 8 caracteres.",
      },
    };
  },
  methods: {
    irRegistro() {
      this.$router.push("/registro");
    },
    irBusqueda() {
      this.$router.push("/busqueda");
    },
    login() {
      if (this.user.length == 0 || this.password.length == 0) {
        this.error = true;
        this.errorMessage =
          "El usuario y la contraseña son campos obligatorios";
      } else if (this.password.length < 8) {
        this.error = true;
        this.errorMessage =
          "La contraseña debe tener un mínimo de 8 caracteres";
      } else {
        this.error = false;
        sessionStorage.setItem("logueado", "ok");
        this.$router.push("/home");
        // peticiones
        //   .auth(this.user, this.password)
        //   .then((resp) => {
        //     console.log(resp);
        //     if (resp.ok) {
        //       sessionStorage.setItem("logueado", "ok");
        //       this.$router.push("/home");
        //     } else {
        //       this.error = true;
        //       this.errorMessage =
        //         "Usuario o contraseña incorrectos, vuelva a intentarlo";
        //     }
        //   })
        //   .catch(console.log);
      }
    },
  },
};
</script>

<style>
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
