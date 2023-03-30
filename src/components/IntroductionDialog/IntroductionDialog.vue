<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab small color="primary" v-bind="attrs" v-on="on">
          <v-icon dark> mdi-information-symbol </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5"> Introduction </v-card-title>

        <v-card-text> </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Get started</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
