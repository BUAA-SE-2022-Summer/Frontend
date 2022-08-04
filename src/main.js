import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
// import vuetify from './plugins/vuetify'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuetify from 'vuetify'

import '@/custom-component' // 注册自定义组件

// 引入全局样式
import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/global.scss'
import vuetify from '@/plugins/vuetify'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(ElementUI)
Vue.use(Vuetify)
new Vue({
  router,
  store,
  axios,
  qs,
  vuetify,
  render: h => h(App),
  data:()=>{
    return{
      user_info:{},
    }
  }
}).$mount('#app')
