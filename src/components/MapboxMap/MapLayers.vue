<template>
  <v-card
    class="map-layer"
    :class="{ 'map-layer--open': showLegend }"
    elevation="4"
    :max-height="maxLayersHeight"
    width="280px"
    :max-width="maxLayersWidth"
  >
    <v-card-title class="map-layer__title subtitle-2" @click="toggleLegend">
      Spatial data

      <v-icon
        class="map-layer__button"
        :class="{ 'map-layer__button--active': showLegend }"
      >
        mdi-chevron-down
      </v-icon>
    </v-card-title>

    <v-card-text class="map-layer__content">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    maxLayersHeight: "calc(100vh - 106px)", // subtracts toolbar, margin and padding.
    maxLayersWidth: "calc(100vw - 32px)", // subtracts padding.
    selectedLegend: null,
    showLegend: false,
  }),
  computed: mapState("data", [
    "mangroveLayers",
    "administrativeBoundariesLayers",
  ]),
  methods: {
    toggleLegend() {
      this.showLegend = !this.showLegend;
    },
  },
};
</script>

<style>
.map-layer.v-card {
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  left: 52px;
  bottom: 24px;
  transform: translateY(calc(100% - 48px + 24px));
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 2;
}

.map-layer--open.v-card {
  transform: translateY(0%);
}

.map-layer__button {
  transform: rotate(-180deg);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.map-layer__button--active {
  transform: rotate(0deg);
}

.map-layer__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
}

.map-layer__content.v-card__text {
  padding-top: 4px;
  overflow-y: auto;
}

.map-layer__image {
  height: auto;
  max-width: 100%;
  width: auto;
}
</style>
