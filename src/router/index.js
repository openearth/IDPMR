import Vue from "vue";
import VueRouter from "vue-router";

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

export default router;
