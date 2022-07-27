import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  qs,
  render: h => h(App)
}).$mount('#app')
