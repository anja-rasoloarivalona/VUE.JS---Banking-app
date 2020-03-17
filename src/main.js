import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Button from './components/Button'
import Input from './components/Input'
import SelectInput from './components/SelectInput'
import FrequencyInput from './components/FrequencyInput'
import Spinner from './components/Spinner'
import Icon from './components/Icon'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:8000/graphql'

const token = JSON.parse(localStorage.getItem('bank-data')).token
Vue.http.headers.common.Authorization = 'Bearer ' + token

Vue.filter('amount', function (value) {
  return value.toLocaleString()
})

Vue.component('app-btn', Button)
Vue.component('app-input', Input)
Vue.component('app-select-input', SelectInput)
Vue.component('app-frequency-input', FrequencyInput)
Vue.component('app-spinner', Spinner)
Vue.component('app-icon', Icon)

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
