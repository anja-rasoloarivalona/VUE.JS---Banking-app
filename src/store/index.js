import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    userName: null,
    status: null,
    wallets: []
  },
  mutations: {
    authUser (state, userData) {
      state.token = userData.token
      state.userId = userData.userId
      state.userName = userData.userName
      state.status = userData.status
    },
    initWallets (state, wallets) {
      state.wallets = wallets
    },
    addWallet (state, wallet) {
      state.wallets = [...state.wallets, wallet]
    }
  },
  actions: {
  },
  modules: {
  }
})
