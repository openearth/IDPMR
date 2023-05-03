<template>
  <v-card-subtitle v-if="message">{{ message }}</v-card-subtitle>
  <v-chart v-else class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import VChart from "vue-echarts";
import propertiesToChartData from "@/lib/properties-to-chart-data";

use([CanvasRenderer, BarChart, GridComponent]);

export default {
  components: {
    VChart,
  },

  props: {
    data: {
      type: Object,
      required: true,
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
    };
  },

  watch: {
    data(value) {
      this.updateChart(value);
    },
  },

  methods: {
    updateChart(data) {
      const properties = data?.features?.[0]?.properties;

      if (properties) {
        const { years, areas } = propertiesToChartData(properties);
        this.option.xAxis.data = years;
        this.option.series[0].data = areas;
        this.message = "";
      } else {
        this.resetChartData();
        this.message = "No data available";
      }
    },
    resetChartData() {
      this.option.xAxis.data = [];
      this.option.series[0].data = [];
    },
  },

  mounted() {
    this.updateChart(this.data);
  },
};
</script>
