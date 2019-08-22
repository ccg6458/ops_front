// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(ElementUI)

Vue.prototype.$domain = 'http://localhost/api'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
