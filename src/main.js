import Vue from 'vue'
// import VueResource from 'vue-resource'
import axios from 'axios'
import App from './App'

import VueI18n from 'vue-i18n'
import messages from './lang'

import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/scss/main.scss'
import ToggleList from './components/Shared/ToggleList'
// components - Shared
import Button from './components/Shared/Button'
import Spinner from './components/Shared/Spinner'
import Icon from './components/Shared/Icon'

// components - Input
import BasicInput from './components/Input/BasicInput'
import SelectInput from './components/Input/SelectInput'
import FrequencyInput from './components/Input/FrequencyInput'
import DateInput from './components/Input/DateInput'
import ColorInput from './components/Input/ColorInput'
import Calendar from 'v-calendar/lib/components/calendar.umd'
// import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUtensils, faShoppingBag, faHome, faBusAlt, faUsers, faTv, faChartLine, faFirstAid, faShoppingCart, faGlassMartiniAlt, faStore, faHamburger, faBabyCarriage, faTshirt, faLaptop, faSeedling, faGift, faDove, faHouseDamage, faHammer, faKey, faMoneyCheckAlt, faLightbulb, faHotel, faCouch, faSubway, faTaxi, faPlane, faTrain, faCar, faCarAlt, faFileInvoiceDollar, faGasPump, faWrench, faCoins, faCocktail, faBook, faRunning, faMicrophone, faHandHoldingUsd, faDumbbell, faWifi, faMobileAlt, faMusic, faUserGraduate, faBuilding, faTruckPickup, faChartBar, faFileMedical, faPrescriptionBottle, faUserMd, faBaby, faCheckCircle, faFunnelDollar, faDiceThree, faWarehouse, faHandshake, faUndoAlt, faShare, faArrowsAlt, faTrash, faCheck, faPlus, faArrowRight, faUndo } from '@fortawesome/free-solid-svg-icons'
library.add(faUtensils, faShoppingBag, faHome, faBusAlt, faUsers, faTv, faChartLine, faFirstAid, faShoppingCart, faGlassMartiniAlt, faStore, faHamburger, faBabyCarriage, faTshirt, faLaptop, faSeedling, faGift, faDove, faHouseDamage, faHammer, faKey, faMoneyCheckAlt, faLightbulb, faHotel, faCouch, faSubway, faTaxi, faPlane, faTrain, faCar, faCarAlt, faFileInvoiceDollar, faGasPump, faWrench, faCoins, faCocktail, faBook, faRunning, faMicrophone, faHandHoldingUsd, faDumbbell, faWifi, faMobileAlt, faMusic, faUserGraduate, faBuilding, faTruckPickup, faChartBar, faFileMedical, faPrescriptionBottle, faUserMd, faBaby, faCheckCircle, faFunnelDollar, faDiceThree, faWarehouse, faHandshake, faUndoAlt, faShare, faArrowsAlt, faTrash, faCheck, faPlus, faArrowRight, faUndo)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

// Vue.use(VueResource)
// Vue.http.options.root = 'http://localhost:8000/graphql'
// Vue.http.headers.common.Authorization = 'Bearer ' + token

const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const url = 'https://anja-bank.herokuapp.com/graphql'
// axios.defaults.baseURL = 'http://localhost:8000/graphql'
axios.defaults.baseURL =  proxyurl + url

axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.headers.common.Accept = 'application/json'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS'

// const data = localStorage.getItem('bank-data')
// if (data) {
//   const token = JSON.parse(data).token
//   axios.defaults.headers.common.Authorization = 'Bearer ' + token
// }

Vue.filter('amount', function (value) {
  const res = value
  // if (res < 0) {
  //   res = value * -1
  // }
  return `${res.toLocaleString()} ${store.state.settings.currentCurrency.split('-')[0].trim()}`
})
Vue.filter('short-date', function (value) {
  const d = new Date(value)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const year = d.getFullYear()
  let date = `${month}/${day}/${year}`
  if (i18n.locale === 'fr') {
    date = `${day}/${month}/${year}`
  }
  return date
})

Vue.filter('really-short-date', function (value) {
  const d = value.split('/')
  let date
  if (i18n.locale === 'en') {
    date = `${i18n.t(`month${d[0]}`)} ${d[1]}`
  }
  if (i18n.locale === 'fr') {
    date = `${d[0]} ${i18n.t(`month${d[1]}`)}`
  }
  return date
})

Vue.component('app-btn', Button)
Vue.component('app-spinner', Spinner)
Vue.component('app-icon', Icon)
Vue.component('app-basic-input', BasicInput)
Vue.component('app-select-input', SelectInput)
Vue.component('app-frequency-input', FrequencyInput)
Vue.component('app-color-input', ColorInput)
Vue.component('app-calendar', Calendar)
Vue.component('app-date-input', DateInput)
Vue.component('app-toggle-list', ToggleList)
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
  i18n,
  render: h => h(App)
}).$mount('#app')
