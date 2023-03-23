<template>
  <main>
    <layers-list :layers="layers" :layer-type="layerType" />
  </main>
</template>

<script>
import LayersList from "@/components/LayersList/LayersList.vue";
import layers from "@/data/mangrove-layers";
import { MANGROVE_LAYER_TYPE } from "@/lib/constants";

export default {
  components: {
    LayersList,
  },
  data() {
    return {
      layers,
      layerType: MANGROVE_LAYER_TYPE,
    };
  },
};
</script>
