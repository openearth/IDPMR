<template>
  <main class="container">
    <v-select
      v-model="selectedLayer"
      :items="formattedLayers"
      dense
      outlined
      hide-details
      :disabled="loading || countryAreaLoading"
      class="administrative-boundaries__select"
    />

    <v-autocomplete
      v-if="selectedLayer && selectedLayer.id"
      v-model="selectedFeatureName"
      label="Select an administrative boundary"
      :items="formattedFeatures"
      dense
      outlined
      hide-details
      :disabled="loading"
      class="administrative-boundaries__select"
    />

    <template v-if="showCharts">
      <ExtendRehabilitatedMangrove v-if="layerIsCountry" :progress="progress" />
      <AnnualProgress :option="barChartOption" :message="chartDataMessage" />
      <ContributionByProvinceToGoal v-if="layerIsCountry" :option="pieChartOption" />
    </template>
  </main>
</template>

<script>
import layers from '@/data/administrative-boundaries-layers'
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
import buildFeatureUrl from '@/lib/build-feature-url'
import ExtendRehabilitatedMangrove from '@/components/ExtendRehabilitatedMangrove/ExtendRehabilitatedMangrove.vue'
import AnnualProgress from '@/components/AnnualProgress/AnnualProgress.vue'
import ContributionByProvinceToGoal from '@/components/ContributionByProvinceToGoal/ContributionByProvinceToGoal.vue'
import propertiesToChartData from '@/lib/properties-to-chart-data'

const defaultLayer = { text: 'Country', value: 'country' }

export default {
  components: {
    ExtendRehabilitatedMangrove,
    AnnualProgress,
    ContributionByProvinceToGoal,
  },
  data() {
    return {
      layers,
      selectedLayer: null,
      selectedFeatureName: null,
      loading: false,
      countryAreaLoading: false,
      chartDataMessage: '',
      progress: 33,
      barChartOption: {
        grid: {
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [],
            color: ['#1976d2'],
            type: 'bar',
          },
        ],
      },
      pieChartOption: {
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Bali' },
              { value: 735, name: 'Maluku Utara' },
              { value: 580, name: 'Lampung' },
              { value: 484, name: 'Kepulauan Riua' },
              { value: 300, name: 'Sumatera Barat' },
            ],
          },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      initiallySelectedLayer: 'administrativeBoundariesLayer',
      initiallySelectedFeature: 'selectedFeature',
    }),
    formattedLayers() {
      const formatted = this.layers.map((layer) => ({
        text: layer.name,
        value: layer,
        features: layer.features,
      }))

      return [defaultLayer, ...formatted]
    },
    formattedFeatures() {
      const formatted = (this.selectedLayer?.features || []).map(
        (features) => ({
          text: features.properties[this.selectedLayer.propertyName],
          value: features.properties[this.selectedLayer.propertyName],
        })
      )

      return [{ text: 'No selection', value: '' }, ...formatted]
    },
    showCharts() {
      if (this.selectedLayer === 'country') {
        return true
      } else if (
        (this.selectedLayer?.name === 'Provinces' ||
          this.selectedLayer?.name === 'Regencies') &&
        this.selectedFeatureName
      ) {
        return true
      }

      return false
    },
    layerIsCountry() {
      return this.selectedLayer === 'country'
    },
  },
  methods: {
    ...mapActions([
      'setAdministrativeBoundariesLayer',
      'removeAdministrativeBoundariesLayer',
      'setSelectedFeature',
      'removeSelectedFeature',
    ]),
    async getFeatures() {
      this.loading = true
      // If the features are already loaded, don't fetch them again
      if (!this.selectedLayer.features) {
        const { data } = await axios(buildFeatureUrl(this.selectedLayer))
        this.$set(this.selectedLayer, 'features', data.features)
        this.layers = this.layers.map((layer) =>
          this.selectedLayer.id === layer.id
            ? { ...layer, features: data.features }
            : layer
        )
      }
      // If there is a selected feature on the store, set it
      if (this.initiallySelectedFeature) {
        this.selectedFeatureName =
          this.initiallySelectedFeature.properties[
            this.selectedLayer.propertyName
          ]
      }

      this.loading = false
    },
    async getSelectedFeature() {
      this.loading = true
      const { data } = await axios(
        buildFeatureUrl({
          ...this.selectedLayer,
          filter: this.selectedFeatureName,
        })
      )

      if (data.features[0]) {
        this.setSelectedFeature({ selectedFeature: data.features[0] })
      }

      const { data: areaData } = await axios(
        buildFeatureUrl({
          ...this.selectedLayer,
          layer:
            this.selectedLayer.name === 'Provinces'
              ? 'indonesia:regions_admin1'
              : 'indonesia:regions_admin2',
          filter: this.selectedFeatureName,
        })
      )

      this.setChartData(areaData)

      this.loading = false
    },

    setChartData(data) {
      const properties = data?.features?.[0]?.properties

      if (properties) {
        const { years, areas } = propertiesToChartData(properties)
        this.barChartOption.xAxis.data = years
        this.barChartOption.series[0].data = areas
        this.chartDataMessage = ''
      } else {
        this.resetChartData()
        this.chartDataMessage = 'Chart data unavailable'
      }
    },

    resetChartData() {
      this.barChartOption.xAxis.data = []
      this.barChartOption.series[0].data = []
    },

    async getCountryArea() {
      this.countryAreaLoading = true

      const { data } = await axios(
        buildFeatureUrl({
          url: 'https://deltaresdata.openearth.eu/geoserver/indonesia/wms',
          maxFeatures: 1,
          layer: 'indonesia:regions_admin0',
        })
      )

      this.setChartData(data)

      this.countryAreaLoading = false
    },
  },
  mounted() {
    this.selectedLayer = this.initiallySelectedLayer || defaultLayer.value
  },
  watch: {
    selectedLayer() {
      if (this.selectedLayer === defaultLayer.value) {
        this.getCountryArea()
      }

      if (this.selectedLayer?.id) {
        this.setAdministrativeBoundariesLayer({ layer: this.selectedLayer })
        this.getFeatures()

        if (this.selectedFeatureName) {
          this.getSelectedFeature()
        } else {
          this.resetChartData()
        }
      } else {
        this.removeAdministrativeBoundariesLayer()
        this.removeSelectedFeature()
        this.selectedFeature = null
      }
    },
    selectedFeatureName() {
      if (this.selectedFeatureName !== '') {
        this.getSelectedFeature()
      } else {
        this.removeSelectedFeature()
        this.resetChartData()
      }
    },
  },
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart {
  height: 400px;
}

.administrative-boundaries__select + .administrative-boundaries__select {
  margin-top: 16px;
}
</style>
