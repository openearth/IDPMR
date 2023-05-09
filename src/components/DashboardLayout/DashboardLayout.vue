<template>
  <div class="darkgrey lighten-3 dashboard-layout">
    <v-container class="dashboard-layout__container">
      <v-row>
        <v-col cols="12" :md="6" :lg="4">
          <v-card class="pa-4 mb-4 rounded-lg" outlined tile>
            <slot name="settings" />
          </v-card>
          <v-card class="pa-4 rounded-lg" outlined tile>
            <slot name="sidebar" />
          </v-card>
        </v-col>
        <v-col cols="12" :md="6" :lg="8">
          <v-card class="dashboard-layout__main" outlined tile>
            <slot name="main" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="$slots['meta-1']" cols="12" :md="6" :lg="4">
          <v-card class="pa-4 rounded-lg" outlined tile>
            <slot name="meta-1" />
          </v-card>
        </v-col>
        <v-col v-if="$slots['meta-2']" cols="12" :md="6" :lg="4">
          <v-card class="pa-4 rounded-lg" outlined tile>
            <slot name="meta-2" />
          </v-card>
        </v-col>
        <v-col v-if="$slots['meta-3']" cols="12" :md="6" :lg="4">
          <v-card class="pa-4 rounded-lg" outlined tile>
            <slot name="meta-3" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<!-- empty script tag is needed to be able to use $slots in the template, otherwise throws type error -->
<script>
export default {};
</script>

<style>
.dashboard-layout {
  height: 100%;
  background: rgb(60, 60, 60);
}

.dashboard-layout__container {
  height: 100%;
  background: rgb(60, 60, 60);
  padding: 0px
}

.dashboard-layout__main {
  height: 100%;
  background: rgb(41, 73, 39);
}
</style>
