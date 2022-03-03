import { required } from 'vuelidate/lib/validators';
<template>
  <div class="fondo">
    <v-row class="mb-0">
      <v-col class="col-12 col-sm-6 col-md-5 pb-0">
        <v-form
          class="grey lighten-5 pa-14 form"
          @submit.prevent="login"
          ref="form"
        >
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
            @focus="quitarError()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            label="Contraseña"
            required
            counter
            outlined
            @click:append="show = !show"
            @focus="quitarError()"
          ></v-text-field>

          <v-btn
            class="mr-4 px-10 py-3 font-weight-bold"
            color="primary"
            large
            type="submit"
          >
            Entrar
          </v-btn>
        </v-form>
      </v-col>
      <v-col class="d-flex justify-center align-center pb-0">
        <div class="d-flex flex-column">
          <v-btn
            class="mb-2 d-block font-weight-bold"
            color="success"
            large
            elevation="15"
            @click="irRegistro()"
          >
            Registrarse
          </v-btn>
          <v-btn
            class="mt-4 d-block white--text font-weight-bold"
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
import peticiones from "@/helpers/peticiones";
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
      } else {
        peticiones
          .auth(this.user, this.password)
          .then((resp) => resp.json())
          .then((data) => {
            if (data.ok) {
              this.error = false;
              this.$refs.form.reset();
              this.user = "";
              this.password = "";
              sessionStorage.setItem("logueado", "ok");
              this.$router.push("/home");
            } else {
              this.error = true;
              this.errorMessage =
                "Usuario o contraseña incorrecto, vuelva a intentarlo.";
            }
          })
          .catch(() => {
            this.error = true;
            this.errorMessage =
              "No se ha podido establecer la conexión con el servidor.";
          });
        // if (resp.ok) {
        //   sessionStorage.setItem("logueado", "ok");
        //   this.$router.push("/home");
        // } else {
        //   this.error = true;
        //   this.errorMessage =
        //     "Usuario o contraseña incorrectos, vuelva a intentarlo";
        // }
      }
    },
    quitarError() {
      this.error = false;
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
