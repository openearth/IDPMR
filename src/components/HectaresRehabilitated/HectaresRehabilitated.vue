<template>
  <v-card-subtitle v-if="message">{{ message }}</v-card-subtitle>
  <v-chart v-else class="chart" :option="option" />
</template>

<script>
import axios from "axios";
import tabs from "@/data/tabs";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import VChart from "vue-echarts";
import buildFeatureUrl from "@/lib/build-feature-url";

use([CanvasRenderer, BarChart, GridComponent]);

export default {
  components: {
    VChart,
  },

  props: {
    feature: {
      type: Object,
    },
  },

  data() {
    return {
      option: {
        grid: {
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            color: ["#1976d2"],
            type: "bar",
          },
        ],
      },
      message: "",
      layers: tabs.find((tab) => tab.id === "mangrove-rehabilitation").layers,
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
        this.message = "Chart data unavailable";
        this.resetChartData();
        return;
      }

      const { years, hectares } = await this.getChartData();

      this.message = "";
      this.option.xAxis.data = years;
      this.option.series[0].data = hectares;
    },
    resetChartData() {
      this.option.xAxis.data = [];
      this.option.series[0].data = [];
    },
    async getChartData() {
      const years = [];
      const hectares = [];
      for (const layer of this.layers) {
        const { year, hectare } = await this.getFeatureData(
          this.feature,
          layer
        );

        years.push(year);
        hectares.push(hectare);
      }

      return {
        years,
        hectares,
      };
    },
    async getFeatureData(feature, layer) {
      const { data } = await axios(
        buildFeatureUrl({
          ...layer,
          layer: layer.layer,
          propertyName: "name_1",
          filter: feature.properties.name_1,
        })
      );

      return {
        year: layer.id.split("-")[1],
        hectare: this.getHectaresRehabilitated(data),
      };
    },
    getHectaresRehabilitated(featureCollection) {
      return featureCollection.features.reduce(
        (hectares, feature) => hectares + feature.properties.luas_ha,
        0
      );
    },
  },
  mounted() {
    this.updateChart();
  },
};
</script>
