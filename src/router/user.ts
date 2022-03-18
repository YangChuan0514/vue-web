export const login = {
  path: "/login",
  name: "login",
  component: () => import("../modules/user/login.vue"),
};
export const register = {
  path: "/register",
  name: "register",
  component: () => import("../modules/user/register.vue"),
};
export const changePassword = {
  path: "/changePassword",
  name: "changePassword",
  component: () => import("../modules/user/changePassword.vue"),
};
