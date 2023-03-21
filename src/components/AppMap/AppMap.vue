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
        v-for="layer in activeLayers"
        :key="layer.id"
        :options="layer"
      />

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
  </div>
</template>

<script>
import MapControlFitbounds from "@/components/MapboxMap/MapControlFitbounds.vue";

export default {
  components: {
    MapControlFitbounds,
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

  computed: {
    activeLayers() {
      return this.$store.state.wmsLayers;
    },
  },

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
  },
};
</script>

<style>
.app-map,
.app-map__map {
  height: 100%;
  width: 100%;
}
</style>
