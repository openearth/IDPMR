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
        :to="`${tab.page}`"
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
};
</script>
