<template>
  <v-app-bar app :color="color" :dark="theme === 'dark'" clipped-left>
    <v-toolbar-title v-if="title">
      {{ title }}
    </v-toolbar-title>

    <v-btn class="ml-auto" fab small color="primary">
      <v-icon dark> mdi-information-symbol </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
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
