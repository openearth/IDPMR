<template>
  <v-card>
    <v-card-title>Annual progress (ha)</v-card-title>
    <v-card-subtitle v-if="message">{{
      message
    }}</v-card-subtitle>
    <v-chart v-else class="chart" :option="option" />
  </v-card>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, GridComponent])

export default {
  components: {
    VChart
  },

  props: {
    option: {
      type: Object,
      required: true,
    },
    message: {
      type: String,
      required: false
    }
  },
}
</script>
