import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Button from './components/Button.vue'
import Spinner from './components/Spinner.vue'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:8000/graphql'

Vue.filter('amount', function (value) {
  return value.toLocaleString()
})

Vue.component('app-btn', Button)
Vue.component('app-spinner', Spinner)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
