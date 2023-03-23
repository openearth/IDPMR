import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

let hasHadFirstRoute = false;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/SettingsView.vue"),
      redirect: "/settings/layers",
      children: [
        {
          path: "layers",
          name: "layers",
          component: () => import("../views/LayersView.vue"),
        },
        {
          path: "administrative-boundaries",
          name: "administrative-boundaries",
          component: () => import("../views/AdministrativeBoundariesView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const layers = store.getters["mangroveLayersIds"].join(",");

  if (hasHadFirstRoute === false) {
    hasHadFirstRoute = true;
    return next();
  }

  if (!!to.query.layers !== !!layers) {
    next({ ...to, query: { layers } });
  } else {
    next();
  }
});

export default router;
