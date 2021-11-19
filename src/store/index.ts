import Vue from "vue";
import Vuex from "vuex";
import PlayerWrapper from "@/models/PlayerWrapper";
import Strings from "../helpers/Strings";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: "nl",
    players: <PlayerWrapper[]>[],
    strings: require("@/assets/strings.json"),
  },
  getters: {
    text: (state) => (tag: string) => {
      return state.strings[tag][state.language];
    },
  },
  mutations: {
    setLanguage(state, lang) {
      state.language = lang;
    },
    setPlayers(state, players) {
      state.players = players;
    },
  },
  actions: {
    setLanguage({ commit }, lang) {
      commit("setLanguage", lang);
    },
    setPlayers({ commit }, players) {
      commit("setPlayers", players);
    },
  },
  modules: {},
});
