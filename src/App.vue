<template>
  <v-app class="app">
    <app-header
      title="Platform Data Terintegrasi untuk Rehabilitasi Mangrove (IDPMR)"
      theme="dark"
    />

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

<style>
.app.theme--light.v-application {
  background-color: #3c3c3c;
}
</style>
