<template>
  <div class="text-center">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.mobile"
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon> mdi-information </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5"> {{ layer.name }} </v-card-title>

        <v-card-text>
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
              <dt class="font-weight-bold layer-information-dialog__key">
                Source
              </dt>
              <dd
                class="layer-information-dialog__value"
                v-html="layer.source"
              />
            </div>
            <div v-if="layer.metadata">
              <dt class="font-weight-bold layer-information-dialog__key">
                Metadata
              </dt>
              <dd
                class="layer-information-dialog__value"
                v-html="layer.metadata"
              />
            </div>
          </dl>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
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
};
</script>

<style>
.layer-information-dialog__list {
  display: grid;
  grid-template-columns: auto 1fr;
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
