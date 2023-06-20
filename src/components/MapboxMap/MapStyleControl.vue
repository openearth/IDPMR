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
    currentStyle: {
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
    styles: {
      dark: "mapbox://styles/mapbox/dark-v11",
      light: "mapbox://styles/mapbox/light-v11",
    },
  }),

  mounted() {
    const map = this.getMap();
    // If we are already loaded
    if (map && map.loaded()) {
      this.addToMap(map);
    }
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
      const newStyle =
        this.currentStyle === this.styles.light
          ? this.styles.dark
          : this.styles.light;
      this.$emit("update-style", newStyle);
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
