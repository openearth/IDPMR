<template>
  <v-card-subtitle v-if="message">{{ message }}</v-card-subtitle>
  <div v-else>
    <v-chart ref="chart" class="chart" :option="option" />
    <v-btn
      v-if="currentUser"
      icon
      @click="downloadChart"
      class="annual-progress__download-button"
    >
      <v-icon> mdi-download </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import VChart from "vue-echarts";
import { mapState } from "vuex";
import propertiesToChartData from "@/lib/properties-to-chart-data";
import downloadFile from "@/lib/download-file";

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

  computed: mapState(["currentUser"]),

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
        this.message = "Chart data unavailable";
      }
    },
    resetChartData() {
      this.option.xAxis.data = [];
      this.option.series[0].data = [];
    },
    downloadChart() {
      downloadFile(
        "annual-progress.png",
        this.$refs.chart.getDataURL({
          type: "png",
        })
      );
    },
  },
};
</script>

<style>
.annual-progress__download-button {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
