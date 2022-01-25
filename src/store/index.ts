import Vue from "vue";
import Vuex from "vuex";
import PlayerWrapper from "@/models/PlayerWrapper";
import Strings from "../helpers/Strings";
import Translations from "@/models/Translations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: "nl",
    players: <PlayerWrapper[]>[],
    strings: require("@/assets/strings.json"),
    dictionary: <Translations>{},
  },
  getters: {
    text: (state) => (tag: string) => {
      return state.dictionary[tag];
    },
  },
  mutations: {
    setLanguage(state, lang) {
      state.language = lang;
    },
    setDictionary(state, dict) {
      state.dictionary = dict;
    },
    setPlayers(state, players) {
      state.players = players;
    },
  },
  actions: {
    setLanguage({ commit }, lang) {
      fetch(`/static/localization/${lang}.json`)
        .then((response) => {
          return response.json();
        })
        .then((dict: Translations) => {
          commit("setDictionary", dict);
          commit("setLanguage", lang)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setPlayers({ commit }, players) {
      commit("setPlayers", players);
    },
  },
  modules: {},
});
