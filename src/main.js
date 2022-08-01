import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import vuetify from './plugins/vuetify'

axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  qs,
  vuetify,
  render: h => h(App)
}).$mount('#app')
