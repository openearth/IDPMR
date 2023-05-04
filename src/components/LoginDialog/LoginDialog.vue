<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.mobile"
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small outlined v-bind="attrs" v-on="on">
        <v-icon> mdi-account </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5"> Login </v-card-title>

      <v-card-text>
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
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login" :disabled="!valid">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
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
