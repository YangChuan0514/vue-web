export const manager = [
    {
      path: "/manager",
      name: "manager",
      component: () => import("../modules/manager/index.vue"),
    },
    {
      path: "/manager",
      name: "managerComplaint",
      component: () => import("../modules/manager/complaint.vue"),
    },
  ];
  