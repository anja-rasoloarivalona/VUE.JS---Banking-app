import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import setup from './modules/setup'
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
    async fetchUserData ({ commit }) {
      const graphqlQuery = initQuery
      try {
        const response = await axios.post('/', graphqlQuery)
        const resData = response.data.data.user
        return resData
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
    setup
  }
})
