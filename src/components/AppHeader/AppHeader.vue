<template>
  <v-app-bar app :color="color" :dark="theme === 'dark'" width="100%">
    <v-app-bar-nav-icon v-if="open" @click.stop="onMenuButtonClick(false)">
      <v-icon>mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-nav-icon v-else @click.stop="onMenuButtonClick(true)">
      <v-icon>mdi-arrow-right</v-icon>
    </v-app-bar-nav-icon>

    <v-toolbar-title v-if="title">
      {{ title }}
    </v-toolbar-title>

    <v-tabs right style="width: auto">
      <v-tab :to="{ name: 'home' }" exact> Introduction </v-tab>
      <v-tab :to="{ name: 'settings' }"> Layers </v-tab>
    </v-tabs>
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
