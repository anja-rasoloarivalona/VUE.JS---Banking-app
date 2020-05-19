import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import setup from './modules/setup'
import settings from './modules/settings'
import UI from './modules/UI'
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
        commit('setUserData', userData)
        commit('initDashboardLayout', userData.settings.dashboardLayout)
      } catch (err) {
        console.log(err.response)
      }
    }
  },
  modules: {
    auth,
    user,
    UI,
    settings,
    setup,
    theme
  }
})
