<template>
  <div class="fondo">
    <buscar-tabla :tab="'libro'" />
  </div>
</template>

<script>
import BuscarTabla from "@/components/BuscarTabla.vue";
export default {
  name: "SearchView",
  components: { BuscarTabla },
};
</script>
