<template>
  <div>
    <v-chart ref="chart" class="chart" :option="option" />
    <download-chart-button filename="contribution-by-province.png" />
  </div>
</template>

<script>
import layers from "@/data/administrative-boundaries-layers";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import VChart from "vue-echarts";
import DownloadChartButton from "../DownloadChartButton/DownloadChartButton.vue";
import buildFeatureUrl from "@/lib/build-feature-url";

use([CanvasRenderer, PieChart, TooltipComponent]);

const AREA = 600000;

export default {
  components: {
    VChart,
    DownloadChartButton,
  },

  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          valueFormatter: (value) => value.toFixed(2),
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
      layer: layers.find((layer) => layer.id === "level-1"),
    };
  },

  methods: {
    async updateChart() {
      const response = await fetch(
        buildFeatureUrl({
          ...this.layer,
          propertyName: "name_1,mg_area2020",
        })
      );
      const data = await response.json();

      this.option.series[0].data = this.getContributionByProvince(data);
    },
    getContributionByProvince(data) {
      let totalRestoredArea = 0;

      const contributionByProvince = data?.features.map((feature) => {
        const area = feature?.properties?.mg_area2020;
        totalRestoredArea += area;

        return {
          name: feature?.properties?.name_1,
          value: this.getPercentage(area, AREA),
        };
      });

      const toRestoreArea = this.getPercentage(AREA - totalRestoredArea, AREA);

      contributionByProvince.push({
        value: toRestoreArea,
        name: "To Restore",
        itemStyle: {
          color: "#D3D3D3",
        },
      });

      return contributionByProvince;
    },
    getPercentage(value, total) {
      return (value / total) * 100;
    },
    resetChartData() {
      this.option.series[0].data = [];
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
