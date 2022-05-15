export const news = [
  {
    path: "/news",
    name: "news",
    component: () => import("../modules/warn/index.vue"),
  },
  {
    path: "/news/leaveMessage",
    name: "leaveMessage",
    component: () => import("../modules/warn/leave_details.vue"),
  },
  {
    path: "/news/notification",
    name: "notification",
    component: () => import("../modules/warn/notification.vue"),
  },
];
