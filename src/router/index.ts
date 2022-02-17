import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";
import index from "../components/index.vue";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "homePage",
      component: () => import("../modules/homePage/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../modules/user/login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../modules/user/register.vue"),
    },
    {
      path: "/changePassword",
      name: "changePassword",
      component: () => import("../modules/user/changePassword.vue"),
    },
  ],
});

// 删除/重置路由
export function resetRoute(): void {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

router.beforeEach((to, from, next) => {
  console.log("log");
  next();
});
export function setupRouter(app: App<Element>) {
  app.use(router);
}
export default router;
