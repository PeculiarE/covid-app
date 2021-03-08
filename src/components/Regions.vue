<template>
  <div class="mt-5 mb-5">
    <h1>Breakdown Per Region</h1>
    <table class="table table-bordered">
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
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Regions',
  computed: {
    ...mapGetters(['getCasesPerRegion']),
  },
  mounted() {
    this.$store.dispatch('retrieveCasesPerRegion');
  },
};
</script>
