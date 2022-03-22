import { createRouter, createWebHistory, useRouter } from "vue-router";
import type { App } from "vue";
import homePage from "./homePage";
import my from "./my";
import forum from "./forum";
import { login, register, changePassword } from "./user";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      redirect: { name: "homePage" },
    },
    homePage,
    forum,
    {
      path: "/forum/add",
      name: "addForum",
      component: () => import("../modules/forum/add.vue"),
    },
    {
      path: "/forum/edit",
      name: "editForum",
      component: () => import("../modules/forum/edit.vue"),
    },
    {
      path: "/forum/add/comment",
      name: "addComment",
      component: () => import("../modules/forum/add_comment.vue"),
    },
    {
      path: "/forum/details",
      name: "forumDetails",
      component: () => import("../modules/forum/forum_details.vue"),
    },
    {
      path: "/forum/search",
      name: "forumSearch",
      component: () => import("../modules/forum/forum_search.vue"),
    },
    {
      path: "/forum/:pathMatch(.*)",
      redirect: { name: "forum" },
    },
    homePage,
    my,
    {
      path: "/user/details",
      name: "userDetails",
      component: () => import("../modules/my/user_details.vue"),
    },
    {
      path: "/user/message",
      name: "userMessage",
      component: () => import("../modules/my/update_user_message.vue"),
    },
    {
      path: "/user/message/edit",
      name: "userMessageEdit",
      component: () => import("../modules/my/write_message.vue"),
    },
    {
      path: "/catIdentification",
      name: "catIdentification",
      component: () => import("../modules/catIdentification/index.vue"),
    },
    {
      path:'/news',
      name:'news',
      component: ()=> import("../modules/warn/index.vue"),
    },
    login,
    register,
    changePassword,
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
