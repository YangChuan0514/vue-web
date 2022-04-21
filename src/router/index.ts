import { createRouter, createWebHistory, useRouter } from "vue-router";
import type { App } from "vue";
import { homePage } from "./homePage";
import { my } from "./my";
import { forum } from "./forum";
import { userOptions } from "./user";
import { news } from "./news";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      redirect: { name: "homePage" },
    },
    ...homePage,
    ...my,
    ...forum,
    ...userOptions,
    ...news,
    {
      path: "/:pathMatch(.*)",
      redirect: { name: "homePage" },
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
  const id = document.cookie?.split("=")[1];
  if (to.path === "/login") next();
  if (id) {
    next();
  } else {
    next({ name: "login" });
  }
});
export function setupRouter(app: App<Element>) {
  app.use(router);
}
export default router;
