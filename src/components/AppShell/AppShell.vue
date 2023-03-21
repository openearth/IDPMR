<template>
  <v-app>
    <app-header
      :title="headerTitle"
      :theme="theme"
      @toggleSidebar="handleToggleSidebar"
      :open="sidebarIsOpen"
    >
      <template slot="right">
        <slot name="header-right" />
      </template>
    </app-header>

    <template>
      <app-sidebar :open="sidebarIsOpen" />

      <v-main>
        <slot name="map" />
        <slot />
      </v-main>
    </template>
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader/AppHeader.vue";
import AppSidebar from "@/components/AppSidebar/AppSidebar.vue";

export default {
  name: "AppShell",

  components: {
    AppHeader,
    AppSidebar,
  },

  props: {
    headerTitle: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "dark",
      validator: (value) => value === "dark" || value === "light",
    },
  },

  data: () => ({
    sidebarIsOpen: true,
  }),

  methods: {
    handleToggleSidebar(value) {
      this.sidebarIsOpen = value;
    },
  },
};
</script>
