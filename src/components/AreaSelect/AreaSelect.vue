<template>
  <div>
    <v-select
      :value="selectedLayer"
      :items="formattedLayers"
      @change="handleSelectedLayerChange"
      dense
      outlined
      hide-details
      :disabled="loading || countryAreaLoading"
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
  </div>
</template>

<script>
import layers from "@/data/administrative-boundaries-layers";
import { mapActions, mapState } from "vuex";
import buildFeatureUrl from "@/lib/build-feature-url";

const defaultLayer = { text: "Country", value: "country" };

export default {
  components: {},
  data() {
    return {
      layers,
      selectedFeatureName: null,
      loading: false,
      countryAreaLoading: false,
      chartDataMessage: "",
      progress: 33,
      annualProgressData: [],
      piechartData: [],
    };
  },
  computed: {
    ...mapState("data", {
      initiallySelectedLayer: "administrativeBoundariesLayer",
      initiallySelectedFeature: "selectedFeature",
      selectedLayer: "selectedLayer",
    }),
    formattedLayers() {
      const formatted = this.layers.map((layer) => ({
        text: layer.name,
        value: layer,
        features: layer.features,
      }));

      return [defaultLayer, ...formatted];
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
    showCharts() {
      if (this.selectedLayer === "country") {
        return true;
      } else if (
        (this.selectedLayer?.name === "Provinces" ||
          this.selectedLayer?.name === "Regencies") &&
        this.selectedFeatureName
      ) {
        return true;
      }

      return false;
    },
  },
  methods: {
    ...mapActions("data", [
      "setAdministrativeBoundariesLayer",
      "removeAdministrativeBoundariesLayer",
      "setSelectedFeature",
      "removeSelectedFeature",
      "setSelectedLayer",
    ]),
    handleSelectedLayerChange(layer) {
      this.setSelectedLayer({ layer });
    },
    async getFeatures() {
      this.loading = true;
      // If the features are already loaded, don't fetch them again
      if (!this.selectedLayer.features) {
        const response = await fetch(buildFeatureUrl(this.selectedLayer));
        const data = await response.json();
        this.$set(this.selectedLayer, "features", data.features);
        this.layers = this.layers.map((layer) =>
          this.selectedLayer.id === layer.id
            ? { ...layer, features: data.features }
            : layer
        );
      }
      // If there is a selected feature on the store, set it
      // otherwise reset it
      if (this.initiallySelectedFeature) {
        this.selectedFeatureName =
          this.initiallySelectedFeature.properties[
            this.selectedLayer.propertyName
          ];
      } else {
        this.selectedFeatureName = null;
      }

      this.loading = false;
    },
    async getSelectedFeature() {
      this.loading = true;

      const response = await fetch(
        buildFeatureUrl({
          ...this.selectedLayer,
          filter: this.selectedFeatureName,
        })
      );
      const data = await response.json();

      if (data.features[0]) {
        this.setSelectedFeature({ selectedFeature: data.features[0] });
      }

      this.loading = false;
    },
  },
  mounted() {
    this.setSelectedLayer({
      layer: this.initiallySelectedLayer || defaultLayer.value,
    });
  },
  watch: {
    selectedLayer() {
      if (this.selectedLayer?.id) {
        this.setAdministrativeBoundariesLayer({ layer: this.selectedLayer });
        this.getFeatures();
      } else {
        this.removeAdministrativeBoundariesLayer();
      }
    },
    selectedFeatureName() {
      if (this.selectedFeatureName && this.selectedFeatureName !== "") {
        this.getSelectedFeature();
      } else {
        this.removeSelectedFeature();
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart {
  height: 400px;
}

.administrative-boundaries__select + .administrative-boundaries__select {
  margin-top: 16px;
}
</style>
