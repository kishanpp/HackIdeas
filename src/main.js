import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueLocalStorage from 'vue-localstorage'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

// Sync router to store, as `store.state.route`.
sync(store, router)

Vue.use(VueCookies)
Vue.use(VueLocalStorage)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
