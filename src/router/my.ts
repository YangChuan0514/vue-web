export const my = [
  {
    path: "/my",
    name: "my",
    component: () => import("../modules/my/index.vue"),
  },
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
    path: "/myShowForum",
    name: "myShowForum",
    component: () => import("../modules/my/my_show_forum.vue"),
  },
  {
    path: "/user/cat_message",
    name: "userCatMessage",
    component: () => import("../modules/my/cat_message.vue"),
  },
];
