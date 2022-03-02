<template>
  <div class="d-flex justify-space-around pt-6">
    <v-card
      v-for="card in cards"
      :key="card.text"
      width="260"
      height="150"
      class="text-center pt-4 rounded-xl"
    >
      <v-icon size="60" color="blue accent-3">{{ card.icon }}</v-icon>
      <v-card-text class="text-h5 font-weight-bold azul">{{
        card.text
      }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "PrincipalTab",
  data() {
    return {
      cards: [
        { text: "Buscar Libros", icon: "mdi-book-search" },
        { text: "Buscar Estudiantes", icon: " mdi-account-search" },
        { text: "Revizar Préstamos", icon: "mdi-book-sync" },
      ],
    };
  },
};
</script>
