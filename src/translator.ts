import _Vue from "vue";
import store from "./store";

export function TranslatorPlugin(Vue: typeof _Vue, options?: any): void {
  Vue.prototype.$text = (tag: string) => {
    return store.getters.text(tag);
  };
}
