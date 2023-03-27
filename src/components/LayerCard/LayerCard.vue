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
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
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
  methods: {
    toggleLayer() {
      this.$emit("toggle-layer", this.layer);
    },
  },
};
</script>

<style>
.layer-card__drag-icon {
  cursor: move;
}
.layer-card__action-icons {
  position: absolute;
  right: 16px;
}
</style>
