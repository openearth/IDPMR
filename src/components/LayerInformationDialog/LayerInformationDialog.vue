<template>
  <app-dialog
    :open="dialog"
    :title="layer.name"
    icon="mdi-information"
    @update-open="updateDialog"
  >
    <template v-slot:content>
      <dl class="layer-information-dialog__list">
        <div v-if="layer.description">
          <dt class="font-weight-bold layer-information-dialog__key">
            Description
          </dt>
          <dd class="layer-information-dialog__value">
            <span>
              {{ layer.description }}
            </span>
          </dd>
        </div>
        <div v-if="layer.source">
          <dt class="font-weight-bold layer-information-dialog__key">Source</dt>
          <dd class="layer-information-dialog__value" v-html="layer.source" />
        </div>
        <div v-if="layer.metadata">
          <dt class="font-weight-bold layer-information-dialog__key">
            Metadata
          </dt>
          <dd class="layer-information-dialog__value" v-html="layer.metadata" />
        </div>
      </dl>
    </template>
    <template v-slot:actions>
      <v-btn color="primary" @click="dialog = false">Close</v-btn>
    </template>
  </app-dialog>
</template>

<script>
import AppDialog from "../AppDialog/AppDialog.vue";

export default {
  components: {
    AppDialog,
  },
  props: {
    layer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    updateDialog(value) {
      this.dialog = value;
    },
  },
};
</script>

<style>
.layer-information-dialog__list {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  row-gap: 8px;
  column-gap: 16px;
}
.layer-information-dialog__list > div {
  display: contents;
}
.layer-information-dialog__key {
  width: 100px;
}
</style>
