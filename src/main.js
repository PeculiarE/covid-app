import Vue from 'vue';
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import router from './router';
import store from './store';

const axiosInstance = axios.create({
  baseURL: 'https://covid-api.mmediagroup.fr/v1',
});
Vue.prototype.$axios = axiosInstance;

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
