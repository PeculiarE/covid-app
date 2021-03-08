import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    worldWideCases: {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      active: 0,
    },
    topThreeCountries: [],
    region: [
      'Europe',
      'North America',
      'South America',
      'Asia',
      'Africa',
      'Oceania',
    ],
    casesPerRegion: [],
    allTheCountries: [],
    searchResult: {},
    displaySearchResult: false,
  },
  getters: {
    getWorldWideCases(state) {
      return state.worldWideCases;
    },
    getTopThreeCountries(state) {
      return state.topThreeCountries;
    },
    getCasesPerRegion(state) {
      return state.casesPerRegion;
    },
    getAllTheCountries(state) {
      return state.allTheCountries;
    },
    getSearchResult(state) {
      return state.searchResult;
    },
    getDisplaySearchResult(state) {
      return state.displaySearchResult;
    },
  },
  mutations: {
    updateWorldWideCases(state, payload) {
      state.worldWideCases.confirmed = payload.confirmed;
      state.worldWideCases.recovered = payload.recovered;
      state.worldWideCases.deaths = payload.deaths;
      state.worldWideCases.active = (payload.confirmed - (payload.recovered + payload.deaths));
    },
    updateTopThreeCountries(state, payload) {
      payload.forEach((el, index) => {
        if (index < 3) {
          state.topThreeCountries.push(el);
        }
      });
    },
    updateCasesPerRegion(state, payload) {
      state.casesPerRegion.push(payload);
    },
    updateAllTheCountries(state, payload) {
      Object.keys(payload).forEach((key) => {
        if (key !== 'Global') {
          const newObj = {};
          newObj.id = key;
          newObj.confirmed = payload[key].All.confirmed;
          newObj.recovered = payload[key].All.recovered;
          newObj.deaths = payload[key].All.deaths;
          newObj.active = (newObj.confirmed - (newObj.recovered + newObj.deaths));
          state.allTheCountries.push(newObj);
        }
      });
    },
    updateSearchResult(state, payload) {
      state.searchResult = payload;
    },
    updateDisplaySearchResult(state) {
      state.displaySearchResult = true;
    },
  },
  actions: {
    retrieveWorldWideCases({ commit }) {
      axios
        .get('https://covid-api.mmediagroup.fr/v1/cases')
        .then(({ data }) => {
          const retrievedData = data.Global.All;
          commit('updateWorldWideCases', retrievedData);
        })
        .catch((error) => {
          console.log(error.response.data);
        })
        .finally(() => {});
    },
    retrieveTopThreeCountries({ commit }) {
      axios
        .get('https://covid-api.mmediagroup.fr/v1/cases')
        .then(({ data }) => {
          const newData = [];
          Object.keys(data).forEach((key) => {
            if (key !== 'Global') {
              const newObj = {};
              newObj.id = key;
              newObj.number = data[key].All.confirmed;
              newData.push(newObj);
            }
            return newData;
          });
          const sortedNumbers = newData.sort((a, b) => b.number - a.number);
          commit('updateTopThreeCountries', sortedNumbers);
        })
        .catch((error) => {
          console.log(error.response.data);
        })
        .finally(() => {});
    },
    retrieveCasesPerRegion(context) {
      const { region } = context.state;
      region.forEach((el) => {
        axios
          .get(`https://covid-api.mmediagroup.fr/v1/cases?continent=${el}`)
          .then(({ data }) => {
            let totalCases = 0;
            Object.values(data).forEach((val) => {
              totalCases += val.All.confirmed;
            });
            const newObj = {};
            newObj.region = `${el}`;
            newObj.cases = totalCases;
            context.commit('updateCasesPerRegion', newObj);
          })
          .catch((error) => {
            console.log(error.response.data);
          })
          .finally(() => {});
      });
    },
    retrieveAllTheCountries(context) {
      axios
        .get('https://covid-api.mmediagroup.fr/v1/cases')
        .then(({ data }) => {
          context.commit('updateAllTheCountries', data);
        })
        .catch((error) => {
          console.log(error.response.data);
        })
        .finally(() => {});
    },
    retrieveSearchResult(context, payload) {
      axios
        .get(`https://covid-api.mmediagroup.fr/v1/cases?country=${payload}`)
        .then(({ data }) => {
          console.log(data);
          const active = data.All.confirmed - (data.All.recovered + data.All.deaths);
          const subData = {
            activeCases: active,
            ...data.All,
          };
          context.commit('updateSearchResult', subData);
          context.commit('updateDisplaySearchResult');
        })
        .catch((error) => {
          console.log(error.response.data);
        })
        .finally(() => {});
    },
  },
  modules: {
  },
});
