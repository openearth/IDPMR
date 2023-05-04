<template>
  <div>
    <v-chart ref="chart" class="chart" :option="option" />
    <download-chart-button filename="contribution-by-province.png" />
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";
import DownloadChartButton from "../DownloadChartButton/DownloadChartButton.vue";

use([CanvasRenderer, PieChart, TooltipComponent]);

export default {
  components: {
    VChart,
    DownloadChartButton,
  },

  props: {
    data: {
      type: Array,
      required: true,
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
    };
  },

  watch: {
    data(value) {
      this.updateChart(value);
    },
  },

  methods: {
    updateChart(data) {
      this.option.series[0].data = data;
    },
    resizeChart() {
      this.$refs.chart?.resize();
    },
  },

  mounted() {
    window.addEventListener("resize", this.resizeChart);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.resizeChart);
  },
};
</script>
