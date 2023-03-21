<script>
import AppShell from "@/components/AppShell/AppShell.vue";
import AppMap from "@/components/AppMap/AppMap.vue";

export default {
  components: {
    AppShell,
    AppMap
  }
}
</script>

<template>
  <div>
    <app-shell header-title="IDPMR">
      <template slot="map">
        <AppMap />
      </template>
    </app-shell>
  </div>
</template>
