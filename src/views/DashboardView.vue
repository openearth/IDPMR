<template>
  <dashboard-layout>
    <template slot="sidebar-start">
      <h2 class="text-h6 mb-4">Area</h2>

      <area-select />
    </template>
    <template slot="sidebar-end">
      <h2 class="text-h6 mb-4">Layers</h2>

      <layers-list
        :layers="layers"
        :initiallySelectedLayers="mangroveLayers"
        @select-layers="setMangroveLayers"
      />
    </template>

    <template slot="main">
      <app-map />
    </template>

    <template slot="meta-1">
      <h2 class="text-h6 mb-4">Progress over time (mock image)</h2>

      <img
        :style="{ width: '100%' }"
        src="https://datavizproject.com/wp-content/uploads/types/Bar-Chart-Vertical.png"
      />
    </template>
    <template slot="meta-2">
      <h2 class="text-h6 mb-4">Progress over time (mock image)</h2>

      <img
        :style="{ width: '100%' }"
        src="https://datavizproject.com/wp-content/uploads/types/Bar-Chart-Vertical.png"
      />
    </template>
    <template slot="meta-3">
      <h2 class="text-h6 mb-4">Progress over time (mock image)</h2>

      <img
        :style="{ width: '100%' }"
        src="https://datavizproject.com/wp-content/uploads/types/Bar-Chart-Vertical.png"
      />
    </template>
  </dashboard-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import layers from "@/data/mangrove-layers";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout.vue";
import AreaSelect from "@/components/AreaSelect/AreaSelect.vue";
import LayersList from "@/components/LayersList/LayersList.vue";
import AppMap from "@/components/AppMap/AppMap.vue";

export default {
  components: {
    DashboardLayout,
    AreaSelect,
    LayersList,
    AppMap,
  },
  data() {
    return {
      layers,
    };
  },
  computed: {
    ...mapState(["mangroveLayers"]),
  },
  beforeMount() {
    this.initializeStore();

    this.unwatch = this.$store.watch(
      (state) => state.mangroveLayers,
      this.syncRouteToStore
    );
  },
  destroyed() {
    this.unwatch();
  },
  methods: {
    ...mapActions(["setMangroveLayers"]),
    initializeStore() {
      const layers = this.$route.query.layers;

      if (layers) {
        this.$store.dispatch("setMangroveLayersById", {
          layerIds: layers.split(","),
        });
      }
    },
    syncRouteToStore() {
      this.$router.replace({
        ...this.$router.currentRoute,
        query: {
          ...this.$router.currentRoute.query,
          layers: this.$store.state.mangroveLayers
            .map((layer) => layer.id)
            .join(","),
        },
      });
    },
  },
};
</script>