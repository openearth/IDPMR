<template>
  <dashboard-layout>
    <template slot="settings">
      <h2 class="text-h6 mb-4">Administrative level</h2>

      <area-select />
    </template>
    <template slot="sidebar">
      <h2 class="text-h6 mb-4">Spatial data</h2>

      <div class="dashboard-view__scrollable-list overflow-y-auto pr-2">
        <layers-list
          :layers="layers"
          :initiallySelectedLayers="mangroveLayers"
          @select-layers="setMangroveLayers"
        />
      </div>
    </template>

    <template slot="main">
      <app-map />
    </template>

    <template slot="meta-1">
      <h2 class="text-h6 mb-4">Extent rehabilitated mangrove (ha)</h2>

      <extend-rehabilitated-mangrove v-if="progress" :progress="progress" />
      <v-card-subtitle v-else>No data available</v-card-subtitle>
    </template>
    <template slot="meta-2">
      <h2 class="text-h6 mb-4 mr-10">Annual progress (ha)</h2>

      <annual-progress :data="annualProgressData" />
    </template>
    <template slot="meta-3">
      <h2 class="text-h6 mb-4 mr-10">Contribution by province to goal (%)</h2>

      <contribution-by-province-to-goal
        v-if="selectedLayerIsCountry"
        :data="contributionByProvinceToGoalData"
      />
      <v-card-subtitle v-else>No data available</v-card-subtitle>
    </template>
  </dashboard-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import layers from "@/data/mangrove-layers";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout.vue";
import AreaSelect from "@/components/AreaSelect/AreaSelect.vue";
import LayersList from "@/components/LayersList/LayersList.vue";
import AppMap from "@/components/AppMap/AppMap.vue";
import ExtendRehabilitatedMangrove from "@/components/ExtendRehabilitatedMangrove/ExtendRehabilitatedMangrove.vue";
import AnnualProgress from "@/components/AnnualProgress/AnnualProgress.vue";
import ContributionByProvinceToGoal from "@/components/ContributionByProvinceToGoal/ContributionByProvinceToGoal.vue";
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
  },
  data() {
    return {
      layers,
      annualProgressData: {},
      contributionByProvinceToGoalData: [],
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
  },
  watch: {
    selectedLayer(value) {
      this.resetChartData();

      if (value === "country") {
        this.removeSelectedFeature();
        this.getCountryArea();
        this.getProvincesArea();
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
      const { data } = await axios(
        buildFeatureUrl({
          url: geoserverIndonesiaBaseUrl,
          maxFeatures: 1,
          layer: "indonesia:regions_admin0",
        })
      );

      this.annualProgressData = data;
    },
    async getProvincesArea() {
      const { data } = await axios(
        buildFeatureUrl({
          url: geoserverIndonesiaBaseUrl,
          propertyName: "name_1,mg_area2020",
          layer: "indonesia:regions_admin1",
        })
      );

      let totalRestoredArea = 0;

      const contributionByProvinceToGoalData = data?.features.map((feature) => {
        const area = feature?.properties?.mg_area2020;
        totalRestoredArea += area;

        return {
          name: feature?.properties?.name_1,
          value: this.getPercentage(area, 600000),
        };
      });

      const toRestoreArea = this.getPercentage(
        600000 - totalRestoredArea,
        600000
      );

      contributionByProvinceToGoalData.push({
        value: toRestoreArea,
        name: "To Restore",
        itemStyle: {
          color: "#D3D3D3",
        },
      });

      this.contributionByProvinceToGoalData = contributionByProvinceToGoalData;
    },
    async getSelectedFeatureData() {
      const { data: areaData } = await axios(
        buildFeatureUrl({
          ...this.selectedLayer,
          layer: `indonesia:${this.selectedLayer.layer}`,
          filter:
            this.selectedFeature.properties[this.selectedLayer.propertyName],
        })
      );

      this.annualProgressData = areaData;

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
