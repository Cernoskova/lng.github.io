import Vue from 'vue';
import Vuex from 'vuex';
// import GdocsAPI from '@/api/gdocs';
import Papa from 'papaparse';

Vue.use(Vuex);
// const gdocsAPI = new GdocsAPI();

export default new Vuex.Store({
  state: {
    events: [],
    loading: true,
    error: {},
    pastEvents: [],
  },
  mutations: {
    SET_DOCUMENT(state, parsed) {
      const allEvents = parsed.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      const currentTime = new Date();
      state.events = allEvents.filter(
        (event) => new Date(event.startDate).getTime() >= currentTime.getTime(),
      );
      state.pastEvents = allEvents.filter(
        (event) => new Date(event.startDate).getTime() < currentTime.getTime(),
      );
    },
    SET_ERROR(state, err) {
      state.error = err;
    },
    SET_LOADING(state, flag) {
      state.loading = flag;
    },
  },
  actions: {
    getDocWithPapa({ commit }) {
      Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vQWQGbChO2Zf6Kznbrb7mHMG-rOawV1gJ1OJBDz6xmbGlQO0EZj0hQM6CGxhEDWK7mrRP1eBTP3LiEW/pub?gid=1346307527&single=true&output=csv', {
      // Papa.parse('/events.csv', {
        download: true,
        header: true,
        complete(result) {
          // console.log(result);
          commit('SET_DOCUMENT', result);
          commit('SET_LOADING', false);
        },
        error(err) {
          commit('SET_ERROR', err);
          commit('SET_LOADING', false);
        },
      });
    },
  },
  modules: {},
});
