import store from "../store";

export default class Strings {
  private strings = require("@/assets/strings.json");

  get(tag: string): string {
    return this.strings[tag][store.state.language];
  }
}
