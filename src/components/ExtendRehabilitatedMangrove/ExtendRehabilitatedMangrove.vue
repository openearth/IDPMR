<template>
  <v-progress-linear :value="progress" height="25" :color="color">
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
