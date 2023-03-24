<template>
  <main class="container">
    <v-select
      v-model="selectedLayer"
      label="Select an area type"
      :items="formattedLayers"
      dense
      outlined
      hide-details
    />
  </main>
</template>

<script>
import layers from "@/data/administrative-boundaries-layers";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      layers,
      selectedLayer: null,
    };
  },
  computed: {
    formattedLayers() {
      const formatted = this.layers.map((layer) => ({
        text: layer.name,
        value: layer,
      }));
      return [{ text: "No selection", value: {} }, ...formatted];
    },
  },
  methods: {
    ...mapActions([
      "setAdministrativeBoundariesLayer",
      "removeAdministrativeBoundariesLayer",
    ]),
  },
  mounted() {
    this.selectedLayer = this.layers.find(
      (layer) => this.$route.query.administrative_boundaries === layer.id
    );
  },
  watch: {
    selectedLayer() {
      if (this.selectedLayer?.id) {
        this.setAdministrativeBoundariesLayer({ layer: this.selectedLayer });
      } else {
        this.removeAdministrativeBoundariesLayer();
      }
    },
  },
};
</script>
