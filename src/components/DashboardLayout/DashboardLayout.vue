<template>
  <div class="grey lighten-5 dashboard-layout">
    <v-container class="dashboard-layout__container">
      <v-row>
        <v-col cols="12" :md="6" :lg="4">
          <v-card class="pa-4 mb-4" outlined tile>
            <slot name="sidebar-start" />
          </v-card>
          <v-card class="pa-4" outlined tile>
            <slot name="sidebar-end" />
          </v-card>
        </v-col>
        <v-col cols="12" :md="6" :lg="8">
          <v-card class="dashboard-layout__main" outlined tile>
            <slot name="main" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" :md="6" :lg="4">
          <v-card class="pa-4" outlined tile>
            <slot name="meta-1" />
          </v-card>
        </v-col>
        <v-col cols="12" :md="6" :lg="4">
          <v-card class="pa-4" outlined tile>
            <slot name="meta-2" />
          </v-card>
        </v-col>
        <v-col cols="12" :md="6" :lg="4">
          <v-card class="pa-4" outlined tile>
            <slot name="meta-3" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
.dashboard-layout {
  height: 100%;
}

.dashboard-layout__container {
  height: 100%;
}

.dashboard-layout__main {
  height: 100%;
}
</style>