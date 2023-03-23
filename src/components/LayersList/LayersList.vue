<template>
  <draggable
    tag="ul"
    v-model="sortedLayers"
    class="layers-list"
    @end="updateLayers"
  >
    <li class="layers-list__item" v-for="layer in sortedLayers" :key="layer.id">
      <layer-card
        :layer="layer"
        :active="activeLayers.some((l) => l.id === layer.id)"
        @toggle-layer="toggleLayer"
      />
    </li>
  </draggable>
</template>

<script>
import { mapActions } from "vuex";
import draggable from "vuedraggable";
import LayerCard from "@/components/LayerCard/LayerCard.vue";
import { MANGROVE_LAYER_TYPE } from "@/lib/constants";

export default {
  components: {
    draggable,
    LayerCard,
  },
  props: {
    layers: {
      type: Array,
      required: true,
    },
    layerType: {
      type: String,
    },
  },
  data() {
    return {
      activeLayers: [],
      sortedLayers: this.layers,
    };
  },
  methods: {
    ...mapActions(["setLayers"]),

    toggleLayer(layer) {
      if (this.activeLayers.some((l) => l.id === layer.id)) {
        this.activeLayers = this.activeLayers.filter((l) => l.id !== layer.id);
      } else {
        this.activeLayers.push(layer);
      }
    },

    updateLayers() {
      const activeSortedLayers = this.sortedLayers.filter((layer) =>
        this.activeLayers.some((l) => l.id === layer.id)
      );

      this.setLayers({ layers: activeSortedLayers, type: this.layerType });
    },
  },
  mounted() {
    if (this.layerType === MANGROVE_LAYER_TYPE) {
      this.activeLayers = this.layers.filter((layer) =>
        this.$route.query.layers.includes(layer.id)
      );
    }
  },
  watch: {
    activeLayers() {
      this.updateLayers();
    },
  },
};
</script>

<style>
ul.layers-list {
  list-style: none;
  padding: 8px;
  margin: 0;
}

.layers-list__item + .layers-list__item {
  margin-top: 8px;
}
</style>
