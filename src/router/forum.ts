export const forum = [
  {
    path: "/forum",
    name: "forum",
    component: () => import("../modules/forum/index.vue"),
  },
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
];
