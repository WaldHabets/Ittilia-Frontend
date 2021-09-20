import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/portal.vue"),
  },
  {
    path: "/ittilia",
    name: "Ittilia",
    component: () => import("@/views/portal.ittilia.vue"),
  },
  {
    path: "/ittilia/classes",
    name: "Classes",
    component: () => import("@/views/portal.ittilia.classes.vue"),
  },
  {
    path: "/ittilia/classes/:class",
    name: "Class",
    component: () => import("@/views/ittilia/class.vue"),
  },
  {
    path: "/tools",
    name: "Tools",
    component: () => import("@/views/portal.tools.vue"),
  },
  {
    path: "/tools/item-forge",
    name: "Item Forge",
    component: () => import("@/views/tools/ItemForge.vue"),
  },
  {
    path: "/tools/initiative-tracker",
    name: "Initiative Tracker",
    component: () => import("@/views/tools/InitiativeTracker.vue"),
  },
  {
    path: "/tools/party-manager",
    name: "Party Manager",
    component: () => import("@/views/tools/PartyManager.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
