<template>
  <div class="app-map">
    <v-mapbox
      class="app-map__map"
      :access-token="mapConfig.accessToken"
      map-style="mapbox://styles/siggyf/ckww2c33f0xlf15nujlx41fe2"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
    >
      <v-mapbox-layer :options="layer" />
    </v-mapbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapConfig: {
        accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
        style: "mapbox://styles/siggyf/ckww2c33f0xlf15nujlx41fe2",
        center: [118.69, -3.64],
        zoom: 4,
      },
      layer: {
        id: "85222873",
        layer: "boundary:AU.MaritimeBoundary",
        type: "raster",
        source: {
          type: "raster",
          tiles: [
            "https://inspire.caris.nl/geoserver/boundary/wms?service=WMS&request=GetMap&width=256&height=256&layers=boundary:AU.MaritimeBoundary&styles=&version=1.3.0&crs=EPSG:3857&transparent=true&bbox={bbox-epsg-3857}&format=image/png",
          ],
          tileSize: 256,
        },
        paint: {},
      },
    };
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