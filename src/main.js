import VueCompositionApi from "@vue/composition-api";
import Vue from "vue";
Vue.use(VueCompositionApi);
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import "./plugins/mapbox";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
