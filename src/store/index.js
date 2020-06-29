import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import setup from './modules/setup'
import settings from './modules/settings'
import dashboard from './modules/dashboard'
import errors from './modules/errors'
import UI from './modules/UI'
import expenses from './modules/expenses'
import incomes from './modules/incomes'
import { initQuery } from '@/graphQL/initQuery'
import axios from 'axios'

import theme from './modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true,
  state: {

  },
  getters: {
    xpty: state => {
      return state
    }
  },
  mutations: {
  },
  actions: {
    async fetchUserData ({ commit }) {
      const graphqlQuery = initQuery
      try {
        const response = await axios.post('/', graphqlQuery)
        const userData = response.data.data.user
        commit('initDashboardLayout', userData.settings.dashboardLayout)
        commit('setUserData', userData)
        commit('initCurrency', userData.settings.currency)
        commit('setIsAppReadyToTrue')
      } catch (err) {
        console.log('error fetching user data', err.response)
      }
    }
  },
  modules: {
    auth,
    user,
    UI,
    settings,
    setup,
    theme,
    dashboard,
    errors,
    expenses,
    incomes
  }
})
