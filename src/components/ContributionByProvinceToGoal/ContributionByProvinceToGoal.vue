<template>
  <pie-chart :data="data" />
</template>

<script>
import layers from "@/data/administrative-boundaries-layers";
import PieChart from "../PieChart/PieChart.vue";
import buildFeatureUrl from "@/lib/build-feature-url";

const AREA = 600000;

export default {
  components: {
    PieChart,
  },

  data() {
    return {
      layer: layers.find((layer) => layer.id === "level-1"),
      data: [],
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

      this.data = this.getContributionByProvince(data);
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
  },

  mounted() {
    this.updateChart();
  },
};
</script>
