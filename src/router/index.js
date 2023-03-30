import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
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
