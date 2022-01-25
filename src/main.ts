import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { TranslatorPlugin } from "@/translator";

Vue.config.productionTip = false;

Vue.use(TranslatorPlugin);

//const browserlang = navigator.language;
store.dispatch("setLanguage", "nl");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
