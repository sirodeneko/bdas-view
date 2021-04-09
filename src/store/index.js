import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    universityData: {},
  },
  getters: {
    getUserDate(state) {
      return state.userData;
    },
    getUniversityDataDate(state) {
      return state.universityData;
    },
  },
  mutations: {
    setUserDate(state,data) {
      state.userData = data;
    },
    setUniversityData(state,data) {
      state.userData = data;
    },
  },
  actions: {},
  modules: {},
});
