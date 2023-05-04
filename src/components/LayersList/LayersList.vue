<template>
  <draggable tag="ul" v-model="sortedLayers" class="layers-list">
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
import { mapState, mapActions } from "vuex";
import draggable from "vuedraggable";
import LayerCard from "@/components/LayerCard/LayerCard.vue";

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
  },
  data() {
    return {
      sortedLayers: [],
    };
  },
  computed: {
    ...mapState("data", { activeLayers: "mangroveLayers" }),
  },
  methods: {
    ...mapActions("data", ["setMangroveLayers"]),
    toggleLayer(layer) {
      const selectedLayers = this.activeLayers.some((l) => l.id === layer.id)
        ? this.activeLayers.filter((l) => l.id !== layer.id)
        : [...this.activeLayers, layer];

      this.updateLayers(selectedLayers);
    },
    updateLayers(layers) {
      const activeSortedLayers = this.sortedLayers.filter((layer) =>
        layers.some((l) => l.id === layer.id)
      );

      this.$emit("select-layers", { layers: activeSortedLayers });
    },
  },
  mounted() {
    this.sortedLayers = [...this.layers];
  },
  watch: {
    layers() {
      this.sortedLayers = [...this.layers];
    },
    sortedLayers() {
      this.updateLayers(this.activeLayers);
    },
  },
};
</script>

<style>
ul.layers-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.layers-list__item + .layers-list__item {
  margin-top: 8px;
}
</style>
