<template>
  <div class="text-center">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.mobile"
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon fab small :outlined="outlineIcon" v-bind="attrs" v-on="on">
          <v-icon> {{ icon }} </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-app-bar class="pr-1 pl-2" flat>
          <v-toolbar-title>
            {{ title }}
          </v-toolbar-title>

          <v-spacer />

          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>

        <v-divider />

        <div class="px-2 py-2 app-dialog__content">
          <v-card-text>
            <slot name="content" />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <slot name="actions" />
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    outlineIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    open(value) {
      this.dialog = value;
    },
    dialog(value) {
      this.$emit("update:open", value);
    },
  },
  mounted() {
    this.dialog = this.open;
  },
};
</script>

<style>
.v-dialog--fullscreen .app-dialog__content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: calc(100vh - 58px); /* 58px is the height of the toolbar */
  justify-content: space-between;
}
</style>
