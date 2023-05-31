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

    <v-tabs
      class="app-header__tabs mr-4"
      v-if="!$vuetify.breakpoint.mobile"
      v-model="currentTab"
      right
    >
      <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.slug" exact-path>
        {{ tab.title }}
      </v-tab>
    </v-tabs>

    <introduction-dialog class="ml-auto mr-2" />

    <authentication />

    <template v-slot:extension v-if="$vuetify.breakpoint.mobile">
      <v-tabs class="app-header__tabs" v-model="currentTab" centered>
        <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.slug" exact-path>
          {{ tab.title }}
        </v-tab>
      </v-tabs>
    </template>
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
  background: rgb(18, 27, 27);
  background: linear-gradient(
    25deg,
    rgba(18, 27, 27, 1) 25%,
    rgba(35, 90, 90, 1) 100%
  );
}
.app-header__tabs.v-tabs {
  width: auto;
}
.v-tabs-bar__content {
  width: 100%;
}
</style>
