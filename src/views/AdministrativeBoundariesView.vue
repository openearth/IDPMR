<template>
  <main class="container">
    <v-select
      v-model="selectedLayer"
      label="Select a type"
      :items="formattedLayers"
      dense
      outlined
      hide-details
      :disabled="loading"
      class="administrative-boundaries__select"
    />

    <v-autocomplete
      v-if="selectedLayer && selectedLayer.id"
      v-model="selectedFeatureName"
      label="Select an administrative boundary"
      :items="formattedFeatures"
      dense
      outlined
      hide-details
      :disabled="loading"
      class="administrative-boundaries__select"
    />
  </main>
</template>

<script>
import layers from "@/data/administrative-boundaries-layers";
import { mapActions, mapState } from "vuex";
import axios from "axios";
import buildFeatureUrl from "@/lib/build-feature-url";

export default {
  data() {
    return {
      layers,
      selectedLayer: null,
      selectedFeatureName: null,
      loading: false,
    };
  },
  computed: {
    ...mapState({
      initiallySelectedLayer: "administrativeBoundariesLayer",
      initiallySelectedFeature: "selectedFeature",
    }),
    formattedLayers() {
      const formatted = this.layers.map((layer) => ({
        text: layer.name,
        value: layer,
        features: layer.features,
      }));
      return [{ text: "No selection", value: {} }, ...formatted];
    },
    formattedFeatures() {
      const formatted = (this.selectedLayer?.features || []).map(
        (features) => ({
          text: features.properties[this.selectedLayer.propertyName],
          value: features.properties[this.selectedLayer.propertyName],
        })
      );
      return [{ text: "No selection", value: "" }, ...formatted];
    },
  },
  methods: {
    ...mapActions([
      "setAdministrativeBoundariesLayer",
      "removeAdministrativeBoundariesLayer",
      "setSelectedFeature",
      "removeSelectedFeature",
    ]),
    async getFeatures() {
      this.loading = true;
      // If the features are already loaded, don't fetch them again
      if (!this.selectedLayer.features) {
        const { data } = await axios(buildFeatureUrl(this.selectedLayer));
        this.$set(this.selectedLayer, "features", data.features);
        this.layers = this.layers.map((layer) =>
          this.selectedLayer.id === layer.id
            ? { ...layer, features: data.features }
            : layer
        );
      }
      // If there is a selected feature on the store, set it
      if (this.initiallySelectedFeature) {
        this.selectedFeatureName =
          this.initiallySelectedFeature.properties[
            this.selectedLayer.propertyName
          ];
      }
      this.loading = false;
    },
    async getSelectedFeature() {
      this.loading = true;
      const { data } = await axios(
        buildFeatureUrl({
          ...this.selectedLayer,
          filter: this.selectedFeatureName,
        })
      );
      if (data.features[0]) {
        this.setSelectedFeature({ selectedFeature: data.features[0] });
      }
      this.loading = false;
    },
  },
  mounted() {
    this.selectedLayer = this.initiallySelectedLayer;
  },
  watch: {
    selectedLayer() {
      if (this.selectedLayer?.id) {
        this.setAdministrativeBoundariesLayer({ layer: this.selectedLayer });
        this.getFeatures();
      } else {
        this.removeAdministrativeBoundariesLayer();
        this.removeSelectedFeature();
        this.selectedFeature = null;
      }
    },
    selectedFeatureName() {
      if (this.selectedFeatureName !== "") {
        this.getSelectedFeature();
      } else {
        this.removeSelectedFeature();
      }
    },
  },
};
</script>

<style>
.administrative-boundaries__select + .administrative-boundaries__select {
  margin-top: 16px;
}
</style>
