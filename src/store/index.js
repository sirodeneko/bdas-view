import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    universityData: {},
    adminData: {},
    inboxData: {},
    userAuth: {},
    certificate: {},
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
    getUserAuth(state) {
      return state.userAuth;
    },
    getCertificate(state) {
      return state.certificate;
    },
  },
  mutations: {
    setUserDate(state, data) {
      state.userData = data;
    },
    setUniversityData(state, data) {
      state.universityData = data;
    },
    setAdminDate(state, data) {
      state.adminData = data;
    },
    setInboxData(state, data) {
      state.inboxData = data;
    },
    setUserAuth(state, data) {
      state.userAuth = data;
    },
    setCertificate(state, data) {
      state.certificate = data;
    },
  },
  actions: {},
  modules: {},
});
