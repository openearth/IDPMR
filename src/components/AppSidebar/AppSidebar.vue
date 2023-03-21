<template>
  <v-navigation-drawer
    class="app-sidebar"
    stateless
    :value="open"
    :width="500"
    absolute
  >
    <router-view />
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppSidebar",
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    drawer: false,
    tabs: [
      { name: "layers", page: "/layers", icon: "mdi-layers", disabled: false },
      {
        name: "administrative boundaries",
        page: "/administrative-boundaries",
        icon: "mdi-download",
        disabled: false,
      },
    ],
  }),
};
</script>
