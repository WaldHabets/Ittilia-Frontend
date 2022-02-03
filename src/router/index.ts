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
    path: "/wiki",
    name: "Wiki",
    component: () => import("@/views/ittilia/wiki.vue"),
  },
  {
    path: "/wiki/:category",
    name: "Wiki Topic",
    component: () => import("@/views/ittilia/wikitopic.vue"),
  },
  {
    path: "/wiki/:category/:topic",
    name: "Wiki Article",
    component: () => import("@/views/ittilia/wikipage.vue"),
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("@/views/map/map.vue"),
  },
  {
    path: "/lineages",
    name: "Lineages",
    component: () => import("@/views/ittilia/lineages.vue"),
  },
  {
    path: "/lineages/:lineage",
    name: "Lineage",
    component: () => import("@/views/ittilia/lineagepage.vue"),
  },
  {
    path: "/classes",
    name: "Classes",
    component: () => import("@/views/portal.ittilia.classes.vue"),
  },
  {
    path: "/classes/:class",
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
  {
    path: "/tools/box",
    name: "Toolbox",
    component: () => import("@/views/tools/Toolbox.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
