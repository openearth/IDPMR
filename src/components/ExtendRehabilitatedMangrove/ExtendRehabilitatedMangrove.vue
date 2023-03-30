<template>
  <v-progress-linear
    :value="progress"
    height="25"
    :color="color"
    class="extend-rehabilitated-mangrove__indicator"
  >
    <strong>{{ Math.ceil(progress) }}%</strong>
  </v-progress-linear>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
  computed: {
    color() {
      if (this.progress < 33) {
        return "red";
      } else if (this.progress < 66) {
        return "orange";
      } else {
        return "green";
      }
    },
  },
};
</script>

<style>
.extend-rehabilitated-mangrove__indicator {
  border-radius: 0 !important;
}
</style>
