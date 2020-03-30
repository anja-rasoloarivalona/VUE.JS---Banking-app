import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import settings from './modules/settings'

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
  },
  modules: {
    auth,
    user,
    settings
  }
})
