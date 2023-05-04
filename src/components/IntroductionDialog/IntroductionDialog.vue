<template>
  <div class="text-center">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.mobile"
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab small outlined v-bind="attrs" v-on="on">
          <v-icon> mdi-information-symbol </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="text-h5">Introduction</v-toolbar-title>
          <v-spacer />
          <v-btn icon>
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <p>
            The IDPMR portal is the viewport of the Integrated Data Management
            Platform for Mangrove Rehabilitation and is in use to better
            coordinate and monitor progress of mangrove rehabilitation.
          </p>
          <p>
            World Bank are working with the Coordinating Ministry of Maritime
            Affairs and Investment (CMMAI) to enable a data-driven approach to
            manage and monitore the rehabilitation of Indonesia’s mangrove
            resources.
          </p>
          <p>
            It comprises four main components, namely, Institutional
            Arrangements, People, Data, and Systems. The IDPMR integrates
            spatial and non-spatial data from various different agencies.
          </p>
          <p>Worldbank and CMMAI</p>
        </v-card-text>

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
  mounted() {
    if (!localStorage.introductionDialog) {
      this.dialog = true;
      localStorage.introductionDialog = true;
    }
  },
};
</script>
