export const userOptions = [
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
];
