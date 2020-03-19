import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import './registerServiceWorker'
import router from './router'
import store from './store'

// components - Shared
import Button from './components/Shared/Button'
import Spinner from './components/Shared/Spinner'
import Icon from './components/Shared/Icon'
// components - Input
import BasicInput from './components/Input/BasicInput'
import SelectInput from './components/Input/SelectInput'
import FrequencyInput from './components/Input/FrequencyInput'

import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:8000/graphql'

const data = localStorage.getItem('bank-data')
if (data) {
  const token = JSON.parse(data).token
  Vue.http.headers.common.Authorization = 'Bearer ' + token
}

Vue.filter('amount', function (value) {
  return value.toLocaleString()
})

Vue.filter('short-date', function (value) {
  const d = new Date(value)
  const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
  const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
  const year = d.getFullYear()
  const date = `${month}/${day}/${year}`
  return date
})

Vue.component('app-btn', Button)
Vue.component('app-spinner', Spinner)
Vue.component('app-icon', Icon)

Vue.component('app-basic-input', BasicInput)
Vue.component('app-select-input', SelectInput)
Vue.component('app-frequency-input', FrequencyInput)

Vue.component('app-calendar', Calendar)
Vue.component('app-date-picker', DatePicker)

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
