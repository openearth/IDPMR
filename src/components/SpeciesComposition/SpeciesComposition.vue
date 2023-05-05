<template>
  <v-card-subtitle v-if="message">{{ message }}</v-card-subtitle>
  <pie-chart v-else :data="data" />
</template>

<script>
import tabs from "@/data/tabs";
import PieChart from "../PieChart/PieChart.vue";
import buildFeatureUrl from "@/lib/build-feature-url";

export default {
  components: {
    PieChart,
  },

  props: {
    feature: {
      type: Object,
    },
  },

  data() {
    return {
      message: "",
      layer: tabs
        .find((tab) => tab.id === "mangrove-rehabilitation")
        .layers.find((layer) => layer.id === "prm-2021"),
      data: [],
    };
  },

  watch: {
    feature() {
      this.updateChart();
    },
  },

  methods: {
    async updateChart() {
      if (!this.feature || !this.feature.properties.name_1) {
        this.message = "No data available";
        this.resetChartData();
        return;
      }

      const data = await this.getChartData();

      if (data.length === 0) {
        this.message = "No data available";
        this.resetChartData();
        return;
      }

      this.data = data;
      this.message = "";
    },
    resetChartData() {
      this.data = [];
    },
    async getChartData() {
      const response = await fetch(
        buildFeatureUrl({
          ...this.layer,
          layer: this.layer.layer,
          propertyName: "name_1",
          filter: this.feature.properties.name_1,
        })
      );
      const data = await response.json();

      const dataPerSpecies = this.getDataPerSpecies(data);

      const total = Object.values(dataPerSpecies).reduce(
        (total, hectares) => total + hectares,
        0
      );

      return Object.entries(dataPerSpecies).map(([species, hectares]) => ({
        name: species,
        value: (hectares / total) * 100,
      }));
    },
    getDataPerSpecies(data) {
      return data?.features.reduce((dataPerSpecies, feature) => {
        const species = feature.properties.species;

        if (!dataPerSpecies[species]) {
          dataPerSpecies[species] = 0;
        }

        dataPerSpecies[species] += feature.properties.luas_ha;

        return dataPerSpecies;
      }, {});
    },
  },
  mounted() {
    this.updateChart();
  },
};
</script>
