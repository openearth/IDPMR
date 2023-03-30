<template>
  <v-app-bar app :color="color" :dark="theme === 'dark'" clipped-left>
    <v-toolbar-title v-if="title">
      {{ title }}
    </v-toolbar-title>

    <introduction-dialog class="ml-auto" />
  </v-app-bar>
</template>

<script>
import IntroductionDialog from "../IntroductionDialog/IntroductionDialog.vue";

export default {
  name: "AppHeader",
  components: {
    IntroductionDialog,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "dark",
      validator: (value) => value === "dark" || value === "light",
    },
    color: {
      type: String,
      default: "primary",
    },
    open: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onMenuButtonClick(value) {
      this.$emit("toggleSidebar", value);
    },
  },
};
</script>
