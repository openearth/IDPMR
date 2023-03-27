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

// Capure NavigationDuplicated errors caused by query parameters updates
// https://stackoverflow.com/a/63263736
const originalPush = router.replace;
router.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }

  return originalPush.call(this, location).catch((err) => {
    if (
      VueRouter.isNavigationFailure(
        err,
        VueRouter.NavigationFailureType.duplicated
      )
    ) {
      return err;
    }

    return Promise.reject(err);
  });
};

export default router;
