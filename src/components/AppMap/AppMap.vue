<template>
  <div class="app-map">
    <v-mapbox
      class="app-map__map"
      :access-token="mapConfig.accessToken"
      :map-style="mapConfig.style"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
      @mb-created="onMapCreated"
    >
      <v-mapbox-layer
        v-if="administrativeBoundariesLayer"
        :key="administrativeBoundariesLayer.id"
        :options="administrativeBoundariesLayer"
        :opacity="0.5"
      />

      <v-mapbox-layer
        v-for="layer in mangroveLayers"
        :key="layer.id"
        :options="layer"
      />

      <map-draw-control :drawn-feature="selectedFeature" />

      <v-mapbox-geocoder />
      <map-style-control
        :current-style="mapConfig.style"
        @update-style="updateStyle"
        position="bottom-right"
        class="app-map__control"
      />
      <map-fitbounds-control
        :fitToBounds="fitToBounds"
        position="bottom-right"
        class="app-map__control"
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
import { bbox } from "@turf/turf";
import MapLegend from "@/components/MapboxMap/MapLegend.vue";
import MapFitboundsControl from "@/components/MapboxMap/MapFitboundsControl.vue";
import MapStyleControl from "@/components/MapboxMap/MapStyleControl.vue";
import MapDrawControl from "@/components/MapboxMap/MapDrawControl.vue";

export default {
  components: {
    MapFitboundsControl,
    MapLegend,
    MapDrawControl,
    MapStyleControl,
  },

  data() {
    return {
      mapConfig: {
        accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
        style: "mapbox://styles/mapbox/light-v11",
        center: [118.69, -3.64],
        zoom: 3.5,
        navigationOptions: {
          showCompass: false,
        },
      },
    };
  },

  computed: mapState("data", {
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
    updateStyle(style) {
      this.mapConfig.style = style;
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

.app-map .mapboxgl-ctrl-attrib-inner a {
  color: #aeaeae;
}

.app-map__control {
  width: 30px;
  height: 30px;
  padding: 3px;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.app-map__control:hover {
  background-color: #f2f2f2; /* #ffffff + rgba(0, 0, 0, 0.05) */
}
</style>
