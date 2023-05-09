<template>
  <app-dialog
    :open.sync="dialog"
    title="Introduction"
    icon="mdi-information-symbol"
    :outline-icon="true"
  >
    <template v-slot:content>
      <p>
        Portal IDPMR adalah viewport dari Integrated Data
          Platform untuk Rehabilitasi Mangrove dan digunakan untuk koordinasi yang lebih baik
          dan memantau kemajuan rehabilitasi mangrove.
      </p>
      <p>
        IDPMR bertujuan untuk menginformasikan pengambilan keputusan 
        sehubungan dengan upaya nasional untuk rehabilitasi mangrove.
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
};
</script>
