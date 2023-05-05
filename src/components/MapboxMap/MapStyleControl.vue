<template>
  <button
    class="map-style-control mapboxgl-ctrl"
    title="Change map style"
    ref="$control"
    @click="changeMapStyle"
    v-show="showControl"
  >
    <v-icon color="black">mdi-layers-triple</v-icon>
  </button>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  inject: ["getMap"],

  props: {
    initialStyle: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: false,
    },
  },

  data: () => ({
    showControl: false,
    currentStyle: "",
    styles: {
      dark: "mapbox://styles/voorhoede/clh8vjw3600x501pg1dzk7vw3",
      light: "mapbox://styles/voorhoede/clh8u52h600wh01pn73ns8zy8",
    },
  }),

  mounted() {
    const map = this.getMap();
    // If we are already loaded
    if (map && map.loaded()) {
      this.addToMap(map);
    }
    this.currentStyle = this.initialStyle;
  },

  computed: mapState("data", [
    "mangroveLayers",
    "administrativeBoundariesLayer",
  ]),

  methods: {
    ...mapActions("data", [
      "setMangroveLayers",
      "setAdministrativeBoundariesLayer",
    ]),

    deferredMountedTo(map) {
      this.addToMap(map);
    },

    addToMap(map) {
      const { $control } = this.$refs;
      const control = new MapStyleControl($control);
      map.addControl(control, this.position);
      this.showControl = true;
    },

    changeMapStyle() {
      const map = this.getMap();

      this.currentStyle =
        this.currentStyle === this.styles.light
          ? this.styles.dark
          : this.styles.light;

      map.setStyle(this.currentStyle);

      // Changing the style removes all layers and sources
      // We need to re-add them
      // https://github.com/mapbox/mapbox-gl-js/issues/4006
      map.on("style.load", () => {
        this.setMangroveLayers({ layers: this.mangroveLayers });
        if (this.administrativeBoundariesLayer) {
          this.setAdministrativeBoundariesLayer({
            layer: this.administrativeBoundariesLayer,
          });
        }
      });
    },
  },
};

class MapStyleControl {
  constructor($element) {
    this._container = $element;
  }

  onAdd() {
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
  }
}
</script>

<style>
.map-style-control {
  width: 30px;
  height: 30px;
  padding: 3px;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.map-style-control:hover {
  background-color: #f2f2f2; /* #ffffff + rgba(0, 0, 0, 0.05) */
}
</style>
