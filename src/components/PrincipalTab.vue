import BuscarLibro from '@/components/BuscarLibro.vue';
<template>
  <div>
    <div class="d-flex justify-space-around pt-16" v-if="back === false">
      <v-card
        v-for="(card, i) in cards"
        :key="i"
        width="260"
        height="150"
        class="text-center pt-4 rounded-xl card"
        @click="accion(i)"
      >
        <v-icon size="60" color="blue accent-3">{{ card.icon }}</v-icon>
        <v-card-text class="text-h5 font-weight-bold azul">{{
          card.text
        }}</v-card-text>
      </v-card>
    </div>
    <div class="ml-10 pt-6">
      <v-btn v-if="back == true" color="default" fab small @click="atras()">
        <v-icon class="boton" color="blue accent-3"
          >mdi-arrow-left-thick</v-icon
        >
      </v-btn>
      <buscar-tabla
        v-if="mostrar == 0"
        class="subir"
        :texto="true"
        :tab="'libro'"
      />
      <buscar-tabla
        v-else-if="mostrar == 1"
        class="subir"
        :texto="true"
        :tab="'estudiante'"
      />
      <buscar-tabla
        v-else-if="mostrar == 2"
        class="subir"
        :texto="true"
        :tab="'prestamo'"
      />
    </div>
  </div>
</template>

<script>
import BuscarTabla from "@/components/BuscarTabla.vue";
export default {
  name: "PrincipalTab",
  components: { BuscarTabla },
  data() {
    return {
      mostrar: null,
      back: false,
      cards: [
        { text: "Buscar Libros", icon: "mdi-book-search" },
        { text: "Buscar Estudiantes", icon: " mdi-account-search" },
        { text: "Revizar Préstamos", icon: "mdi-book-sync" },
      ],
    };
  },
  methods: {
    accion(i) {
      this.mostrar = i;
      this.back = true;
    },
    atras() {
      this.back = false;
      this.mostrar = null;
    },
  },
};
</script>

<style scoped>
.boton {
  cursor: pointer;
}
.card:hover {
  cursor: pointer;
  background-color: #e3f2fd;
}
.subir {
  margin-top: -5.2rem;
}
</style>
