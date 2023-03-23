<template>
  <main>
    <layers-list :layers="layers" :layer-type="layerType" />
  </main>
</template>

<script>
import LayersList from "@/components/LayersList/LayersList.vue";
import layers from "@/data/administrative-boundaries-layers";
import { ADMINISTRATIVE_BOUNDARIES_LAYER_TYPE } from "@/lib/constants";

export default {
  components: {
    LayersList,
  },
  data() {
    return {
      layers,
      layerType: ADMINISTRATIVE_BOUNDARIES_LAYER_TYPE,
    };
  },
};
</script>
