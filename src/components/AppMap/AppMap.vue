<template>
  <div class="app-map">
    <v-mapbox
      class="app-map__map"
      :access-token="mapConfig.accessToken"
      map-style="mapbox://styles/siggyf/ckww2c33f0xlf15nujlx41fe2"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
      @mb-created="onMapCreated"
    >
      <v-mapbox-layer
        v-if="administrativeBoundariesLayer"
        :key="administrativeBoundariesLayer.id"
        :options="administrativeBoundariesLayer"
        :opacity="0.3"
      />

      <v-mapbox-layer
        v-for="layer in mangroveLayers"
        :key="layer.id"
        :options="layer"
      />

      <map-draw-control :drawn-feature="selectedFeature" />

      <v-mapbox-geocoder />
      <map-control-fitbounds
        :fitToBounds="fitToBounds"
        position="bottom-right"
      />
      <v-mapbox-navigation-control
        :options="mapConfig.navigationOptions"
        position="bottom-right"
      />
    </v-mapbox>

    <v-fade-transition mode="out-in">
      <map-legend />
    </v-fade-transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MapControlFitbounds from "@/components/MapboxMap/MapControlFitbounds.vue";
import MapLegend from "@/components/MapboxMap/MapLegend.vue";
import MapDrawControl from "@/components/MapboxMap/MapDrawControl.vue";
import { bbox } from "@turf/turf";

export default {
  components: {
    MapControlFitbounds,
    MapLegend,
    MapDrawControl,
  },

  data() {
    return {
      mapConfig: {
        accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
        style: "mapbox://styles/siggyf/ckww2c33f0xlf15nujlx41fe2",
        center: [118.69, -3.64],
        zoom: 4,
        navigationOptions: {
          showCompass: false,
        },
      },
    };
  },

  computed: mapState({
    mangroveLayers: "wmsMangroveLayers",
    administrativeBoundariesLayer: "wmsAdministrativeBoundariesLayer",
    selectedFeature: "selectedFeature",
  }),

  methods: {
    onMapCreated(map) {
      this.$root.map = map;
    },
    fitToBounds() {
      this.$root.map.flyTo({
        center: this.mapConfig.center,
        zoom: this.mapConfig.zoom,
      });
    },
    zoomToSelectedFeature() {
      const boundingBox = bbox(this.selectedFeature);
      this.$root.map.fitBounds(boundingBox, { padding: 80 });
    },
  },

  watch: {
    selectedFeature(value) {
      if (value) {
        this.zoomToSelectedFeature();
      } else {
        this.fitToBounds();
      }
    },
    
    administrativeBoundariesLayer(value) {
      if (!value) {
        this.fitToBounds();
      }
    }
  },
};
</script>

<style>
.app-map {
  overflow: hidden;
  position: relative;
  min-height: 400px;
}

.app-map,
.app-map__map {
  height: 100%;
  width: 100%;
}
</style>
