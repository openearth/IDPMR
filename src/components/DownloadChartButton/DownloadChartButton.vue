<template>
  <v-btn
    v-if="currentUser"
    icon
    @click="downloadChart"
    class="download-chart-button"
  >
    <v-icon> mdi-download </v-icon>
  </v-btn>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    filename: {
      type: String,
      required: true,
    },
  },

  computed: mapState("authentication", ["currentUser"]),

  methods: {
    downloadChart() {
      const anchor = document.createElement("a");
      anchor.href = this.$parent.$refs.chart.getDataURL({
        type: "png",
      });
      anchor.target = "_blank";
      anchor.download = this.filename;
      anchor.click();
    },
  },
};
</script>

<style>
.download-chart-button {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
