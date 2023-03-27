<template>
  <div>
    <app-shell header-title="IDPMR">
      <template slot="map">
        <app-map />
      </template>
    </app-shell>
  </div>
</template>

<script>
import AppShell from "@/components/AppShell/AppShell.vue";
import AppMap from "@/components/AppMap/AppMap.vue";

export default {
  components: {
    AppShell,
    AppMap,
  },
};
</script>
