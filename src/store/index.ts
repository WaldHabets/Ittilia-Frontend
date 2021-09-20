import Vue from "vue";
import Vuex from "vuex";
import PlayerWrapper from "@/models/PlayerWrapper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: "nl",
    players: <PlayerWrapper[]>[],
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
