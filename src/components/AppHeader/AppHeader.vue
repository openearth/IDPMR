<template>
  <v-app-bar
    app
    :color="color"
    :dark="theme === 'dark'"
    clipped-left
    class="app-header__app-bar"
  >
    <v-toolbar-title class="font-weight-bold" v-if="title">
      {{ title }}
    </v-toolbar-title>

    <introduction-dialog class="ml-auto mr-2" />
    <authentication />
  </v-app-bar>
</template>

<script>
import IntroductionDialog from "../IntroductionDialog/IntroductionDialog.vue";
import Authentication from "../Authentication/Authentication.vue";

export default {
  name: "AppHeader",
  components: {
    IntroductionDialog,
    Authentication,
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

<style>
.app-header__app-bar {
  background: rgb(19, 81, 55);
  background: linear-gradient(
    36deg,
    rgba(19, 81, 55, 1) 71%,
    rgba(71, 116, 27, 1) 100%
  );
}
</style>
