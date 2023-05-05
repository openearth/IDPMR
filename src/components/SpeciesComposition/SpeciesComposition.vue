<template>
  <v-card-subtitle v-if="message">{{ message }}</v-card-subtitle>
  <div v-else>
    <v-chart ref="chart" class="chart" :option="option" />
    <download-chart-button filename="species-composition.png" />
  </div>
</template>

<script>
import tabs from "@/data/tabs";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";
import DownloadChartButton from "../DownloadChartButton/DownloadChartButton.vue";
import buildFeatureUrl from "@/lib/build-feature-url";

use([CanvasRenderer, PieChart, TooltipComponent]);

export default {
  components: {
    VChart,
    DownloadChartButton,
  },

  props: {
    feature: {
      type: Object,
    },
  },

  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            avoidLabelOverlap: false,
            data: [],
          },
        ],
      },
      message: "",
      layer: tabs
        .find((tab) => tab.id === "mangrove-rehabilitation")
        .layers.find((layer) => layer.id === "prm-2021"),
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

      this.option.series[0].data = data;
      this.message = "";
    },
    resetChartData() {
      this.option.series[0].data = [];
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
    resizeChart() {
      this.$refs.chart?.resize();
    },
  },
  mounted() {
    this.updateChart();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeChart);
  },
};
</script>
