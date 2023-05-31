import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: "#235a5a",
      },
    },
  },
  breakpoint: {
    mobileBreakpoint: "sm",
  },
};

export default new Vuetify(opts);
