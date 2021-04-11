import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    universityData: {},
    adminData:{},
    inboxData:{},
  },
  getters: {
    getUserDate(state) {
      return state.userData;
    },
    getUniversityData(state) {
      return state.universityData;
    },
    getAdminData(state) {
      return state.adminData;
    },
    getInboxData(state) {
      return state.inboxData;
    },
  },
  mutations: {
    setUserDate(state,data) {
      state.userData = data;
    },
    setUniversityData(state,data) {
      state.universityData = data;
    },
    setAdminDate(state,data){
      state.adminData = data;
    },
    setInboxData(state,data){
      state.inboxData = data;
    }
  },
  actions: {},
  modules: {},
});
