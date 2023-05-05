<template>
  <app-dialog
    :open.sync="dialog"
    title="Login"
    icon="mdi-account"
    :outline-icon="true"
  >
    <template v-slot:content>
      <v-form ref="form" v-model="valid">
        <v-text-field
          prepend-icon="mdi-account"
          name="email"
          label="Email"
          type="text"
          required
          v-model="email"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          id="password"
          prepend-icon="mdi-lock"
          name="password"
          label="Password"
          type="password"
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>
      </v-form>
    </template>

    <template v-slot:actions>
      <v-btn color="primary" @click="login" :disabled="!valid">Login</v-btn>
    </template>
  </app-dialog>
</template>

<script>
import { mapActions } from "vuex";
import AppDialog from "../AppDialog/AppDialog.vue";

export default {
  components: {
    AppDialog,
  },
  data() {
    return {
      dialog: false,
      valid: false,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
      ],
    };
  },
  methods: {
    ...mapActions("authentication", ["setCurrentUser"]),
    validate() {
      this.$refs.form.validate();
    },
    login() {
      if (this.valid) {
        this.dialog = false;
        this.setCurrentUser({
          currentUser: { email: this.email, password: this.password },
        });
      }
    },
  },
};
</script>
