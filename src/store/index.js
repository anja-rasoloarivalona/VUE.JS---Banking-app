import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    userName: null,
    status: null,
    goal: null,
    balance: 0,
    wallets: [],
    incomes: [],
    expenses: [],
    transactions: []
  },
  getters: {
    usersTransactions: state => {
      const transactions = {}
      state.incomes.forEach(income => {
        transactions[income.name] = {
          _id: income._id,
          amount: income.amount,
          counterparty: income.from,
          transactionType: 'income'
        }
      })
      state.expenses.forEach(expense => {
        transactions[expense.name] = {
          _id: expense._id,
          transactionType: 'expense',
          expenseType: expense.expenseType,
          category: expense.category,
          amount: expense.amount
        }
      })
      return transactions
    },
    walletsName: state => {
      const walletsNameArray = []
      state.wallets.forEach(wallet => {
        if (wallet.supplier) {
          walletsNameArray.push(`${wallet.walletType} - ${wallet.supplier}`)
        } else {
          walletsNameArray.push(`${wallet.walletType}`)
        }
      })
      return walletsNameArray
    }
  },
  mutations: {
    authUser (state, userData) {
      state.token = userData.token
      state.userId = userData.userId
      state.userName = userData.userName
      state.status = userData.status
    },
    initAppData (state, data) {
      state.wallets = data.wallets
      state.incomes = data.incomes
      state.expenses = data.expenses
      state.goal = data.goal
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
    },
    setStatusToActive (state) {
      state.status = 'active'
    },
    initBalance (state, amount) {
      state.balance = amount
    }
  },
  actions: {
  },
  modules: {
  }
})
