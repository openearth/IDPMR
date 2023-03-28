<template>
  <div>
    <v-tabs
      v-model="tabs.name"
      fixed-tabs
      icons-and-text
      background-color="blue-grey lighten-5"
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.name"
        :to="{
          path: tab.page,
          query: $route.query,
        }"
        :ripple="false"
        :exact-path="tab.page === '/'"
        :disabled="tab.disabled"
      >
        {{ tab.name }}
        <v-icon>{{ tab.icon }}</v-icon>
      </v-tab>
    </v-tabs>

    <v-divider />

    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    tabs: [
      { name: "layers", page: "/settings/layers", disabled: false },
      {
        name: "administrative boundaries",
        page: "/settings/administrative-boundaries",
        disabled: false,
      },
    ],
  }),
  beforeMount() {
    this.initializeStore();

    this.unwatch = this.$store.watch(
      (state) => state.mangroveLayers,
      this.syncRouteToStore
    );
  },
  destroyed() {
    this.unwatch();
  },
  methods: {
    initializeStore() {
      const layers = this.$route.query.layers;

      if (layers) {
        this.$store.dispatch("setMangroveLayersById", {
          layerIds: layers.split(","),
        });
      }
    },
    syncRouteToStore() {
      this.$router.replace({
        ...this.$router.currentRoute,
        query: {
          ...this.$router.currentRoute.query,
          layers: this.$store.state.mangroveLayers
            .map((layer) => layer.id)
            .join(","),
        },
      });
    },
  },
};
</script>
