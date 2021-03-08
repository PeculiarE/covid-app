<template>
  <div class="home">
    <form @submit.prevent="retrieveSearchResult(searchItem)">
      <input type="text" placeholder="Search" v-model="searchItem">
    </form>
    <div v-if="getDisplaySearchResult">
      {{searchItem}}
      {{getSearchResult.confirmed}}
       {{getSearchResult.recovered}}
    </div>
    <div v-else>
      <div>
        <h1>Total Cases WorldWide: {{getWorldWideCases.confirmed}}</h1>
        <h1>Total Recoveries WorldWide: {{getWorldWideCases.recovered}}</h1>
        <h1>Total Deaths WorldWide: {{getWorldWideCases.deaths}}</h1>
        <h1>Active Cases WorldWide: {{getWorldWideCases.active}}</h1>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th v-for="(country, index) in getTopThreeCountries" :key="index">{{country.id}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="(country, index) in getTopThreeCountries"
              :key="index">{{country.number}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Total Number of Cases</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(value, index) in getCasesPerRegion" :key="index">
                <td>{{ value.region }}</td>
                <td>{{ value.cases }}</td>
              </tr>
            </tbody>
        </table>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Country</th>
              <th>Total Confirmed Cases</th>
              <th>Total Recoveries</th>
              <th>Total Deaths</th>
              <th>Total Active Cases</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(value, index) in getAllTheCountries" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ value.id }}</td>
                <td>{{ value.confirmed }}</td>
                <td>{{ value.recovered }}</td>
                <td>{{ value.deaths }}</td>
                <td>{{ value.active }}</td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      searchItem: '',
    };
  },
  components: {},
  computed: {
    ...mapGetters(['getWorldWideCases',
      'getTopThreeCountries',
      'getCasesPerRegion',
      'getAllTheCountries',
      'getSearchResult',
      'getDisplaySearchResult']),
  },
  mounted() {
    this.$store.dispatch('retrieveWorldWideCases');
    this.$store.dispatch('retrieveTopThreeCountries');
    this.$store.dispatch('retrieveCasesPerRegion');
    this.$store.dispatch('retrieveAllTheCountries');
  },
  methods: {
    ...mapActions(['retrieveSearchResult']),
  },
};
</script>
