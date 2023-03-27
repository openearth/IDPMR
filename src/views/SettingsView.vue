<template>
  <div>
    <v-tabs
      v-model="tabs.name"
      fixed-tabs
      icons-and-text
      background-color="blue-grey lighten-5"
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.name"
        :to="`${tab.page}`"
        :ripple="false"
        :exact-path="tab.page === '/'"
        :disabled="tab.disabled"
      >
        {{ tab.name }}
        <v-icon>{{ tab.icon }}</v-icon>
      </v-tab>
    </v-tabs>

    <v-divider />

    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import router from "@/router";
import mangroveLayers from "@/data/mangrove-layers";
import administrativeBoundariesLayers from "@/data/administrative-boundaries-layers";

export default {
  data: () => ({
    drawer: false,
    tabs: [
      { name: "layers", page: "/settings/layers", disabled: false },
      {
        name: "administrative boundaries",
        page: "/settings/administrative-boundaries",
        disabled: false,
      },
    ],
  }),
  computed: {
    ...mapState([
      "mangroveLayers",
      "administrativeBoundariesLayer",
      "selectedFeature",
    ]),
    ...mapGetters({
      storeIsEmpty: "isEmpty",
    }),
    mangroveLayersIds() {
      return this.mangroveLayers.map((layer) => layer.id).join(",");
    },
    selectedFeatureName() {
      return this.selectedFeature?.properties[
        this.administrativeBoundariesLayer?.propertyName
      ];
    },
    queryParamsFromStore() {
      return {
        selected_feature: this.selectedFeatureName,
        layers: this.mangroveLayersIds,
        feature_type: this.administrativeBoundariesLayer?.id,
      };
    },
  },
  methods: {
    ...mapActions([
      "setMangroveLayers",
      "setAdministrativeBoundariesLayer",
      "setSelectedFeature",
    ]),
    initializeStore() {
      const { layers, feature_type, selected_feature } = this.$route.query;

      if (layers) {
        const layerIds = (layers || "").split(",");
        const selectedLayers = mangroveLayers.filter((layer) =>
          layerIds.includes(layer.id)
        );
        this.setMangroveLayers({ layers: selectedLayers });
      }

      const selectedAdministrativeLayer = administrativeBoundariesLayers.find(
        (layer) => layer.id === feature_type
      );
      if (selectedAdministrativeLayer) {
        this.setAdministrativeBoundariesLayer({
          layer: selectedAdministrativeLayer,
        });
      }

      if (selectedAdministrativeLayer && selected_feature) {
        const selectedFeature = {
          properties: {
            [selectedAdministrativeLayer.propertyName]: selected_feature,
          },
        };
        this.setSelectedFeature({ selectedFeature });
      }
    },
  },
  beforeUpdate() {
    router.replace({ query: this.queryParamsFromStore });
  },
  beforeMount() {
    if (this.storeIsEmpty) {
      this.initializeStore();
    } else {
      router.replace({ query: this.queryParamsFromStore });
    }
  },
};
</script>
