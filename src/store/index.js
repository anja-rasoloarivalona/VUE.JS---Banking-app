import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    userName: null,
    status: null
  },
  mutations: {
    authUser (state, userData) {
      state.token = userData.token
      state.userId = userData.userId
      state.userName = userData.userName
      state.status = userData.status
    }
  },
  actions: {
  },
  modules: {
  }
})
