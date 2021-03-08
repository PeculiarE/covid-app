<template>
  <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Covid-19 App</a>
      <form class="d-flex" @submit.prevent="submitForm(searchItem)">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model.lazy.trim="searchItem"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return {
      searchItem: '',
    };
  },
  methods: {
    ...mapActions(['retrieveSearchResult']),
    submitForm(value) {
      this.$emit('receiveSearchItem', value);
      this.retrieveSearchResult(this.searchItem);
    },
  },
};
</script>
