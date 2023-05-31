<template>
  <dashboard-layout>
    <template slot="settings">
      <h2 class="text-h6 mb-4">Tingkat administrasi</h2>

      <area-select />
    </template>
    <template slot="sidebar">
      <h2 class="text-h6 mb-4">Data spasial</h2>

      <div class="dashboard-view__scrollable-list overflow-y-auto pr-2">
        <layers-list :layers="layers" @select-layers="setMangroveLayers" />
      </div>
    </template>

    <template slot="main">
      <app-map />
    </template>

    <template slot="meta-1">
      <h2 class="text-h6 mb-4">Progres rehabilitasi mangrove (ha)</h2>

      <extend-rehabilitated-mangrove v-if="progress" :progress="progress" />
      <v-card-subtitle v-else>No data available</v-card-subtitle>
    </template>
    <template v-if="isMangroveExtentTab" slot="meta-2">
      <h2 class="text-h6 mb-4">
        Progres tahunan (ha)
        <span v-if="selectedFeature">
          |
          {{ selectedFeatureName }}</span
        >
      </h2>

      <annual-progress :data="annualProgressData" />
    </template>
    <template v-else slot="meta-2">
      <h2 class="text-h6 mb-4">
        Jumlah hektar yang direhabilitasi per tahun
        <span v-if="selectedFeature">
          |
          {{ selectedFeatureName }}</span
        >
      </h2>

      <hectares-rehabilitated :feature="selectedFeature" />
    </template>
    <template v-if="isMangroveExtentTab" slot="meta-3">
      <h2 class="text-h6 mb-4 mr-10">Kontribusi setiap provinsi (%)</h2>

      <contribution-by-province-to-goal v-if="selectedLayerIsCountry" />
      <v-card-subtitle v-else>No data available</v-card-subtitle>
    </template>
    <template v-else slot="meta-3">
      <h2 class="text-h6 mb-4">
        Komposisi spesies mangrove
        <span v-if="selectedFeature">
          |
          {{ selectedFeatureName }}</span
        >
      </h2>

      <species-composition :feature="selectedFeature" />
    </template>
  </dashboard-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import tabs from "@/data/tabs";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout.vue";
import AreaSelect from "@/components/AreaSelect/AreaSelect.vue";
import LayersList from "@/components/LayersList/LayersList.vue";
import AppMap from "@/components/AppMap/AppMap.vue";
import ExtendRehabilitatedMangrove from "@/components/ExtendRehabilitatedMangrove/ExtendRehabilitatedMangrove.vue";
import AnnualProgress from "@/components/AnnualProgress/AnnualProgress.vue";
import ContributionByProvinceToGoal from "@/components/ContributionByProvinceToGoal/ContributionByProvinceToGoal.vue";
import HectaresRehabilitated from "@/components/HectaresRehabilitated/HectaresRehabilitated.vue";
import SpeciesComposition from "@/components/SpeciesComposition/SpeciesComposition.vue";
import buildFeatureUrl from "@/lib/build-feature-url";

const geoserverIndonesiaBaseUrl =
  "https://deltaresdata.openearth.eu/geoserver/indonesia/wms";

export default {
  components: {
    DashboardLayout,
    AreaSelect,
    LayersList,
    AppMap,
    ExtendRehabilitatedMangrove,
    AnnualProgress,
    ContributionByProvinceToGoal,
    HectaresRehabilitated,
    SpeciesComposition,
  },
  data() {
    return {
      annualProgressData: {},
    };
  },
  computed: {
    ...mapState("data", ["mangroveLayers", "selectedFeature", "selectedLayer"]),
    selectedLayerIsCountry() {
      return this.selectedLayer === "country";
    },
    progress() {
      if (this.selectedLayerIsCountry) {
        const latestValue =
          this.annualProgressData?.features?.[0]?.properties?.mg_area2020 || 0;
        return this.getPercentage(latestValue, 600000);
      }

      return null;
    },
    currentTab() {
      return tabs.find((tab) => tab.slug === this.$route.path)?.id;
    },
    layers() {
      return tabs.find((tab) => tab.id === this.currentTab)?.layers || [];
    },
    selectedFeatureName() {
      return this.selectedFeature?.properties[this.selectedLayer?.propertyName];
    },
    isMangroveExtentTab() {
      return this.currentTab === "mangrove-extent";
    },
  },
  watch: {
    selectedLayer(value) {
      this.removeSelectedFeature();
      this.resetChartData();

      if (value === "country") {
        this.getCountryArea();
      }
    },
    selectedFeature(value) {
      this.resetChartData();

      if (value?.properties[this.selectedLayer.propertyName]) {
        this.getSelectedFeatureData(value);
      }
    },
  },
  beforeMount() {
    this.initializeStore();

    this.unwatch = this.$store.watch(
      (state) => state.data.mangroveLayers,
      this.syncRouteToStore
    );
  },
  destroyed() {
    this.unwatch();
  },
  methods: {
    ...mapActions("data", [
      "setMangroveLayers",
      "setMangroveLayersById",
      "removeSelectedFeature",
    ]),
    initializeStore() {
      const layers = this.$route.query.layers;

      if (layers) {
        this.setMangroveLayersById({
          layerIds: layers.split(","),
        });
      }
    },
    syncRouteToStore() {
      this.$router.replace({
        ...this.$router.currentRoute,
        query: {
          ...this.$router.currentRoute.query,
          layers: this.mangroveLayers.map((layer) => layer.id).join(","),
        },
      });
    },
    async getCountryArea() {
      const response = await fetch(
        buildFeatureUrl({
          url: geoserverIndonesiaBaseUrl,
          maxFeatures: 1,
          layer: "indonesia:regions_admin0",
        })
      );

      this.annualProgressData = await response.json();
    },
    async getSelectedFeatureData() {
      const response = await fetch(
        buildFeatureUrl({
          ...this.selectedLayer,
          layer: `indonesia:${this.selectedLayer.layer}`,
          filter: this.selectedFeatureName,
        })
      );

      this.annualProgressData = await response.json();

      this.loading = false;
    },
    resetChartData() {
      if (this.annualProgressData.xAxis && this.annualProgressData.series[0]) {
        this.annualProgressData.xAxis.data = [];
        this.annualProgressData.series[0].data = [];
      }
    },
    getPercentage(value, total) {
      return (value / total) * 100;
    },
  },
};
</script>

<style>
.dashboard-view__scrollable-list {
  max-height: 300px;
}
</style>
