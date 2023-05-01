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

    <v-tabs class="app-header__tabs mr-4" v-model="currentTab" right>
      <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.slug" exact-path>
        {{ tab.title }}
      </v-tab>
    </v-tabs>

    <introduction-dialog class="mr-2" />
    <authentication />
  </v-app-bar>
</template>

<script>
import IntroductionDialog from "../IntroductionDialog/IntroductionDialog.vue";
import Authentication from "../Authentication/Authentication.vue";
import tabs from "@/data/tabs";

export default {
  name: "AppHeader",
  components: {
    IntroductionDialog,
    Authentication,
  },
  data() {
    return {
      tabs,
      currentTab: "",
    };
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
.app-header__tabs.v-tabs {
  width: auto;
}
</style>
