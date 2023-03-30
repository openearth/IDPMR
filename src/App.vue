<template>
  <v-app :style="{ height: '100%' }">
    <app-header title="IDPRM" theme="dark"></app-header>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>
