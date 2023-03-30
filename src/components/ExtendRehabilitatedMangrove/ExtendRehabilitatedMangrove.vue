<template>
  <v-card>
    <v-card-title>Extent rehabilitated mangrove (ha)</v-card-title>
    <v-progress-linear :value="progress" height="25">
      <strong>{{ Math.ceil(progress) }}%</strong>
    </v-progress-linear>
  </v-card>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
}
</script>
