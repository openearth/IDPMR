<template>
  <main class="container">
    <layers-list
      :layers="layers"
      :initiallySelectedLayers="mangroveLayers"
      @select-layers="setMangroveLayers"
    />
  </main>
</template>

<script>
import LayersList from "@/components/LayersList/LayersList.vue";
import layers from "@/data/mangrove-layers";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    LayersList,
  },
  data() {
    return {
      layers,
    };
  },
  computed: {
    ...mapState(["mangroveLayers"]),
  },
  methods: {
    ...mapActions(["setMangroveLayers"]),
  },
};
</script>
