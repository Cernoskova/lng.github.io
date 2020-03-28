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
  },
  mutations: {
    // SET_DOCUMENT(state, payload) {
    //   const gdoc = Papa.parse(payload);
    //   const events = gdoc.data;
    //   console.log(events);
    //   const gdocEvents = [];
    //   events.map((row) => {
    //     gdocEvents.push({ name: row[0], description: row[1] });
    //     return row;
    //   });
    //   state.events = gdocEvents;
    // },
    SET_DOCUMENT(state, parsed) {
      // console.log('SET DOC', parsed);
      // const gdocEvents = [];
      // parsed.data.map((row) => {
      //   gdocEvents.push({ name: row[0], description: row[1] });
      //   return row;
      // });
      state.events = parsed.data;
    },
    SET_ERROR(state, err) {
      // console.log('SET DOC', parsed);
      // const gdocEvents = [];
      // parsed.data.map((row) => {
      //   gdocEvents.push({ name: row[0], description: row[1] });
      //   return row;
      // });
      state.error = err;
    },
    SET_LOADING(state, flag) {
      state.loading = flag;
    },
  },
  actions: {
    // getDoc({ commit }) {
    //   commit('SET_LOADING', true);

    //   gdocsAPI
    //     .getGdocsAPI()
    //     .get()
    //     .then((res) => {
    //       if (res.status === 200) {
    //         console.log(res);
    //         commit('SET_DOCUMENT', res.data);
    //       }
    //       commit('SET_DOCUMENT', false);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       commit('SET_DOCUMENT', false);
    //     });
    // },
    getDocWithPapa({ commit }) {
      commit('SET_LOADING', true);

      Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vQWQGbChO2Zf6Kznbrb7mHMG-rOawV1gJ1OJBDz6xmbGlQO0EZj0hQM6CGxhEDWK7mrRP1eBTP3LiEW/pub?gid=0&single=true&output=csv', {
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
