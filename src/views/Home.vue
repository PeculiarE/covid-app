<template>
  <div class="home">
    <NavBar @receiveSearchItem="getSearchItem" />
    <br>
    <div v-if="getDisplaySearchResult"
    class="card text-white bg-dark mb-3 border-dark" style="max-width: 18rem;">
      <br>
      <div class="card-body text-white bg-dark mb-3">
        <h5 class="card-title"><b>{{searchItem}}</b></h5>
        <hr>
        <p class="card-text">
          Located in {{getSearchResult.continent}}, {{searchItem}} has a population of roughly
          {{getSearchResult.population}} people</p>
      </div>
      <ul class="list-group list-group-flush text-dark">
        <li class="list-group-item">Capital: {{getSearchResult.capital_city}}</li>
        <li class="list-group-item">Total Confirmed Cases: {{getSearchResult.confirmed}}</li>
        <li class="list-group-item">Total Recovered Cases: {{getSearchResult.recovered}}</li>
        <li class="list-group-item">Total Deaths: {{getSearchResult.deaths}}</li>
        <li class="list-group-item">Total Active Cases: {{getSearchResult.activeCases}}</li>
      </ul>
    </div>
    <div v-else>
      <div>
        <h1>Total Cases Worldwide: {{getWorldWideCases.confirmed}}</h1>
        <h1>Total Recoveries Worldwide: {{getWorldWideCases.recovered}}</h1>
        <h1>Total Deaths Worldwide: {{getWorldWideCases.deaths}}</h1>
        <h1>Active Cases Worldwide: {{getWorldWideCases.active}}</h1>
      </div>
      <div>
        <TopThree />
        <Regions />
        <AllCountries />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue';
import TopThree from '@/components/TopThree.vue';
import Regions from '@/components/Regions.vue';
import AllCountries from '@/components/AllCountries.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      searchItem: '',
    };
  },
  components: {
    NavBar,
    TopThree,
    Regions,
    AllCountries,
  },
  computed: {
    ...mapGetters(['getWorldWideCases',
      'getSearchResult',
      'getDisplaySearchResult']),
  },
  mounted() {
    this.$store.dispatch('retrieveWorldWideCases');
  },
  methods: {
    getSearchItem(value) {
      this.searchItem = value;
    },
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0px 100px;
  box-sizing: border-box;
}
</style>
