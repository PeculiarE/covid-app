<template>
  <div class="mt-5">
    <h3>List of All Countries</h3>
    <table class="table table-bordered">
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
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AllCountries',
  computed: {
    ...mapGetters(['getAllTheCountries']),
  },
  mounted() {
    this.$store.dispatch('retrieveAllTheCountries');
  },
};
</script>
