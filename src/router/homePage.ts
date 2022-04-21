export const homePage = [
  {
    path: "/homePage",
    name: "homePage",
    component: () => import("../modules/homePage/index.vue"),
  },
  {
    path: "/catIdentification",
    name: "catIdentification",
    component: () => import("../modules/catIdentification/index.vue"),
  },
  {
    path: "/catSecret",
    name: "catSecret",
    component: () => import("../modules/catSecret/index.vue"),
  },
  {
    path: "/catEncyclopedia",
    name: "catEncyclopedia",
    component: () => import("../modules/catEncyclopedia/index.vue"),
  },
  {
    path: "/catQuestions",
    name: "catQuestions",
    component: () => import("../modules/catQuestions/index.vue"),
  },
  {
    path: "/dataDetails",
    name: "dataDetails",
    component: () => import("../modules/homePage/dataDetails.vue"),
  },
  {
    path: "/catDetails",
    name: "catDetails",
    component: () => import("../modules/catEncyclopedia/catDetails.vue"),
  },
];
