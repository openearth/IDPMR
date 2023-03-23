<template>
  <layer-list-controls
    :layers="layers"
    @active-layers-change="onActiveLayerChange"
    @layer-sorting-change="onLayerSortingChange"
  />
</template>

<script>
import { LayerListControls } from "@deltares/vue-components";
import { mapActions } from "vuex";

export default {
  props: {
    layers: {
      type: Array,
      required: true,
    },
    layerType: {
      type: String,
    },
  },
  components: {
    LayerListControls,
  },
  methods: {
    ...mapActions(["setLayers"]),

    onActiveLayerChange(activeLayers) {
      this.setLayers({ layers: activeLayers, type: this.layerType });
    },

    onLayerSortingChange(sortedLayers) {
      this.setLayers({ layers: sortedLayers, type: this.layerType });
    },
  },
};
</script>
