<template>
  <login-dialog v-if="!currentUser" />
  <user-menu v-else />
</template>

<script>
import LoginDialog from "../LoginDialog/LoginDialog.vue";
import UserMenu from "../UserMenu/UserMenu.vue";
import { mapState } from "vuex";

export default {
  components: {
    LoginDialog,
    UserMenu,
  },
  computed: mapState("authentication", ["currentUser"]),
};
</script>
