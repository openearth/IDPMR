<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";

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
  },
};
</script>
