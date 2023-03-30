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
          <v-checkbox
            v-model="hide"
            @change="updateUserPreference"
            label="Don't show this again"
          ></v-checkbox>
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
      hide: false,
    };
  },
  methods: {
    updateUserPreference() {
      if (this.hide) {
        localStorage.introductionDialog = this.hide;
      } else {
        localStorage.removeItem("introductionDialog");
      }
    },
  },
  mounted() {
    if (!localStorage.introductionDialog) {
      this.dialog = true;
    }
  },
};
</script>
