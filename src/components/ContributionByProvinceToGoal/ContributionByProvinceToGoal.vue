<template>
  <div>
    <v-chart ref="chart" class="chart" :option="option" />
    <v-btn
      v-if="currentUser"
      icon
      @click="downloadChart"
      class="contribution-by-province-to-goal__download-button"
    >
      <v-icon> mdi-download </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import { mapState } from "vuex";
import VChart from "vue-echarts";
import downloadFile from "@/lib/download-file";

use([CanvasRenderer, PieChart, TooltipComponent]);

export default {
  components: {
    VChart,
  },

  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  computed: mapState(["currentUser"]),

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
    downloadChart() {
      downloadFile(
        "contribution-by-province.png",
        this.$refs.chart.getDataURL({
          type: "png",
        })
      );
    },
  },
};
</script>

<style>
.contribution-by-province-to-goal__download-button {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
