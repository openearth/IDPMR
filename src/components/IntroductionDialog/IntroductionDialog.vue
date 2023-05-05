<template>
  <app-dialog
    :open="dialog"
    title="Introduction"
    icon="mdi-information-symbol"
    :outline-icon="true"
    @update-open="updateDialog"
  >
    <template v-slot:content>
      <p>
        The IDPMR portal is the viewport of the Integrated Data Management
        Platform for Mangrove Rehabilitation and is in use to better coordinate
        and monitor progress of mangrove rehabilitation.
      </p>
      <p>
        World Bank are working with the Coordinating Ministry of Maritime
        Affairs and Investment (CMMAI) to enable a data-driven approach to
        manage and monitore the rehabilitation of Indonesia’s mangrove
        resources.
      </p>
      <p>
        It comprises four main components, namely, Institutional Arrangements,
        People, Data, and Systems. The IDPMR integrates spatial and non-spatial
        data from various different agencies.
      </p>
      <p>Worldbank and CMMAI</p>
    </template>
    <template v-slot:actions>
      <v-btn color="primary" @click="dialog = false">Get started</v-btn>
    </template>
  </app-dialog>
</template>

<script>
import AppDialog from "../AppDialog/AppDialog.vue";

export default {
  components: {
    AppDialog,
  },
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
  methods: {
    updateDialog(value) {
      this.dialog = value;
    },
  },
};
</script>
