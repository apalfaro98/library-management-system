<template>
  <div>
    <div class="d-flex align-center">
      <v-select
        class="select mt-4 ml-7"
        :items="carreras"
        label="Carreras"
        append-icon="mdi-filter-menu"
        solo
        dense
      ></v-select>
      <v-select
        class="select mt-4 ml-7"
        :items="anios"
        label="Años"
        append-icon="mdi-filter-menu"
        solo
        dense
      ></v-select>
    </div>
    <div class="d-flex justify-center mt-5">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1 tabla"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "LibrosTab",
  data() {
    return {
      carreras: [
        "Ciencia de la Computación",
        "Ingeniería Informática",
        "Licenciatura en Matemática",
        "Licenciatura en Física",
        "Ciencias de la Información",
      ],
      anios: ["1er Año", "2do Año", "3ro Año", "4to Año", "5to Año"],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
};
</script>

<style scoped>
.select {
  max-width: 150px;
}
</style>
