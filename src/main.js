import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Button from './components/Button.vue'

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.filter('amount', function (value) {
  return value.toLocaleString()
})

Vue.component('app-btn', Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
