<template>
  <v-card class="layer-card" outlined>
    <v-card-title>
      <v-icon class="layer-card__drag-icon" left> mdi-drag-vertical </v-icon>
      <span class="text-subtitle-1" :class="{ 'font-weight-bold': active }">{{
        layer.name
      }}</span>
      <div class="layer-card__action-icons">
        <v-btn icon @click="toggleLayer">
          <v-icon v-if="active">mdi-eye</v-icon>
          <v-icon v-else> mdi-eye-off </v-icon>
        </v-btn>
        <layer-information-dialog :layer="layer" />
        <v-btn v-if="currentUser" icon @click="downloadLayer">
          <v-icon> mdi-download </v-icon>
        </v-btn>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import LayerInformationDialog from "../LayerInformationDialog/LayerInformationDialog.vue";
import buildDownloadUrl from "@/lib/build-download-url";

export default {
  components: {
    LayerInformationDialog,
  },
  props: {
    layer: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  computed: mapState("authentication", ["currentUser"]),
  methods: {
    toggleLayer() {
      this.$emit("toggle-layer", this.layer);
    },
    downloadLayer() {
      const anchor = document.createElement("a");
      anchor.href = buildDownloadUrl(this.layer);
      anchor.target = "_blank";
      anchor.download = `${this.layer.name}.zip`;
      anchor.click();
    },
  },
};
</script>

<style>
.layer-card__drag-icon {
  cursor: move;
}
.layer-card__action-icons {
  display: flex;
  position: absolute;
  right: 16px;
}
</style>
