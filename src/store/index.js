import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    userName: null,
    status: null,
    wallets: [],
    incomes: [],
    expenses: []
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
    },
    initIncomes (state, incomes) {
      state.incomes = incomes
    },
    addIncome (state, income) {
      state.incomes = [...state.incomes, income]
    },
    initExpenses (state, expenses) {
      state.expenses = expenses
    },
    addExpense (state, expense) {
      state.expenses = [...state.expenses, expense]
    }
  },
  actions: {
  },
  modules: {
  }
})
