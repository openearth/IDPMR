<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small outlined v-bind="attrs" v-on="on">
        <v-icon> mdi-account-tie </v-icon>
      </v-btn>
    </template>
    <v-list class="user-menu__list mt-2">
      <v-list-item @click="logout">
        <v-list-item-title>Log Out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("authentication", ["removeCurrentUser"]),
    logout() {
      this.removeCurrentUser();
    },
  },
};
</script>

<style>
.user-menu__list {
  min-width: 150px;
}
</style>
