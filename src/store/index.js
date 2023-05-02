import Vue from "vue";
import Vuex from "vuex";

import authentication from "./modules/authentication";
import data from "./modules/data";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    data,
  },
});
