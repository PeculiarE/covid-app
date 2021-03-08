<template>
  <div class="mt-5 mb-5">
    <h1>Top 3 Affected Countries</h1>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="(country, index) in getTopThreeCountries" :key="index">
            {{ country.id }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="(country, index) in getTopThreeCountries" :key="index">
            {{ country.number }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TopThree',
  computed: {
    ...mapGetters(['getTopThreeCountries']),
  },
  mounted() {
    this.$store.dispatch('retrieveTopThreeCountries');
  },
};
</script>
