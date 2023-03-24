<template>
  <main class="container">
    <layers-list :layers="layers" @select-layers="setMangroveLayers" />
  </main>
</template>

<script>
import LayersList from "@/components/LayersList/LayersList.vue";
import layers from "@/data/mangrove-layers";
import { mapActions } from "vuex";

export default {
  components: {
    LayersList,
  },
  data() {
    return {
      layers,
    };
  },
  methods: {
    ...mapActions(["setMangroveLayers"]),
  },
};
</script>
