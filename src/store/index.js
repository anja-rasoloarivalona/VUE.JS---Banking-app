import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import settings from './modules/settings'
import UI from './modules/UI'
import { initQuery } from '@/graphQL/initQuery'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true,
  state: {

  },
  getters: {

  },
  mutations: {
  },
  actions: {
    async initialize ({ commit }) {
      const graphqlQuery = initQuery
      try {
        const response = await axios.post('/', graphqlQuery)
        const resData = response.data.data.user
        const theme = resData.settings.theme

        console.log(resData)

        console.log('initalizing', this.state.settings.secondaryColors)

        commit('initAppData', resData)

        commit('setTheme', theme)
        commit('setPreviousTheme', theme)
        commit('setDefaultDashboardLayout', resData)

        if (resData.settings.dashboardLayout.length > 0) {
          commit('setCurrentDashboardLayout', resData.settings.dashboardLayout)
        }
        const htmlElement = document.documentElement
        htmlElement.setAttribute('theme', theme)
        if (resData.status === 'active') {
          commit('setAppStatus', 'running')
        }
        return true
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
    auth,
    user,
    UI,
    settings
  }
})
