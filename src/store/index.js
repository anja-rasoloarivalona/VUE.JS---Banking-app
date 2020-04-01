import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import settings from './modules/settings'
import { initQuery } from '@/graphQL/initQuery'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
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
        commit('initAppData', resData)
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
    settings
  }
})
