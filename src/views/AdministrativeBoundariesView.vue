<template>
  <main>
    <layers-list :layers="layers" />
  </main>
</template>

<script>
import LayersList from "@/components/LayersList/LayersList.vue";
import layers from "@/data/administrative-boundaries-layers";

export default {
  components: {
    LayersList,
  },
  data() {
    return {
      layers,
    };
  },
};
</script>
