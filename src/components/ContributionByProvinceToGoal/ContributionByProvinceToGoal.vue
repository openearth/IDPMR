<template>
  <v-card>
    <v-card-title>Contribution by province to goal (%)</v-card-title>
    <v-chart class="chart" :option="option" />
  </v-card>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, PieChart, TooltipComponent])

export default {
  components: {
    VChart
  },

  props: {
    option: {
      type: Object,
      required: true,
    },
  },
}
</script>
