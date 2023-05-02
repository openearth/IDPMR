<template>
  <v-card
    class="map-legend"
    :class="{ 'map-legend--open': showLegend }"
    elevation="4"
    :max-height="maxLegendHeight"
    width="280px"
    :max-width="maxLegendWidth"
    v-if="dataLayers.length > 0"
  >
    <v-card-title class="map-legend__title subtitle-2" @click="toggleLegend">
      Legends

      <v-icon
        class="map-legend__button"
        :class="{ 'map-legend__button--active': showLegend }"
      >
        mdi-chevron-down
      </v-icon>
    </v-card-title>

    <v-card-text v-if="dataLayers.length >= 2" class="map-legend__content">
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="(layer, index) in dataLayers" :key="index">
          <v-expansion-panel-header>
            {{ layer.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <img class="map-legend__image" alt="" :src="legendUrl(layer)" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>

    <v-card-text v-else class="map-legend__content">
      <p class="body-1 mb-2">
        {{ dataLayers[0].name }}
      </p>
      <img class="map-legend__image" alt="" :src="legendUrl(dataLayers[0])" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import buildLegendUrl from "@/lib/build-legend-url";

export default {
  data: () => ({
    maxLegendHeight: "calc(100vh - 106px)", // subtracts toolbar, margin and padding.
    maxLegendWidth: "calc(100vw - 32px)", // subtracts padding.
    selectedLegend: null,
    showLegend: false,
  }),

  computed: mapState("data", ["dataLayers", "administrativeBoundariesLayers"]),

  methods: {
    legendUrl(layer) {
      return buildLegendUrl(layer);
    },

    toggleLegend() {
      this.showLegend = !this.showLegend;
    },
  },
};
</script>

<style>
.map-legend.v-card {
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  right: 52px;
  bottom: 24px;
  transform: translateY(calc(100% - 48px + 24px));
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 2;
}

.map-legend--open.v-card {
  transform: translateY(0%);
}

.map-legend__button {
  transform: rotate(-180deg);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.map-legend__button--active {
  transform: rotate(0deg);
}

.map-legend__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
}

.map-legend__content.v-card__text {
  padding-top: 4px;
  overflow-y: auto;
}

.map-legend__image {
  height: auto;
  max-width: 100%;
  width: auto;
}
</style>
