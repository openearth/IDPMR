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
  },
  components: {
    LayerListControls,
  },
  methods: {
    ...mapActions(["setLayers"]),

    onActiveLayerChange(activeLayers) {
      this.setLayers({ layers: activeLayers });
    },

    onLayerSortingChange(sortedLayers) {
      console.log(sortedLayers);
    },
  },
};
</script>
