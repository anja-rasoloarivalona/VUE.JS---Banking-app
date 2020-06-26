import { editIncomeQuery, addIncomeQuery, deleteIncomeQuery } from '@/graphQL/incomeQuery'
import { editExpenseQuery, addExpenseQuery, deleteExpenseQuery } from '@/graphQL/expenseQuery'
import { addTransactionQuery, editTransactionQuery } from '@/graphQL/transactionsQuery'
import axios from 'axios'
import Vue from 'vue'

const state = {
  goal: null,
  // balance: 0,
  wallets: [],
  incomes: [],
  expenses: [],
  monthlyReports: [],
  walletTypeList: [
    {
      value: 'Debit card',
      i18: 'debitCard'
    }, {
      value: 'Credit card',
      i18: 'creditCard'
    },
    {
      value: 'Cash',
      i18: 'cash'
    }
  ]
}

const getters = {
  user: state => {
    return state
  },
  userBalance: state => {
    let balance = 0
    state.wallets.forEach(wallet => {
      if (wallet.walletType === 'Debit card' || wallet.walletType === 'Cash') {
        balance += wallet.amount
      }
      if (wallet.walletType === 'Credit card') {
        balance -= wallet.amount
      }
    })
    return balance
  },
  userTransactions: state => {
    // console.log('user vuex tra', getters.usersIncomesAndExpenses())
    const transactions = []
    state.monthlyReports.forEach(report => {
      report.transactions.forEach(transaction => {
        transactions.push(transaction)
      })
    })
    const sortedTransactions = transactions.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date)
    })
    return sortedTransactions
  },
  currentPeriodReport: state => {
    let currentReport = {}
    const d = new Date()
    const currentPeriod = `${d.getMonth() + 1}-${d.getFullYear()}`
    state.monthlyReports.find((report, index) => {
      if (report.period === currentPeriod) {
        currentReport = state.monthlyReports[index]
        return true
      }
    })
    return currentReport
  },
  upcoming: state => {
    const datedTransactions = [...state.incomes]
    state.expenses.forEach(expense => {
      if (expense.expenseType === 'fixed') {
        datedTransactions.push(expense)
      }
    })
    if (datedTransactions.length < 1) {
      return false
    }
    let result = {
      name: datedTransactions[0].name,
      date: new Date(datedTransactions[0].nextPayout),
      value: datedTransactions[0].amount
    }
    datedTransactions.forEach(transaction => {
      if (new Date(transaction.nextPayout) < result.date) {
        result = {
          name: transaction.name,
          date: new Date(transaction.nextPayout),
          value: transaction.amount
        }
      }
    })
    return result
  },
  creditBalance: state => {
    const credits = ['Visa', 'MasterCard']
    let creditBalance = 0
    state.wallets.forEach(wallet => {
      if (credits.includes(wallet.walletType)) {
        creditBalance += wallet.amount
      }
    })
    return creditBalance
  }
}

const mutations = {
  setUserData (state, data) {
    state.wallets = data.wallets
    state.incomes = data.incomes
    state.expenses = data.expenses
    state.goal = data.goal
    state.monthlyReports = data.monthlyReports
  },
  clearUserData (state) {
    state.goal = null
    state.balance = 0
    state.wallets = []
    state.incomes = []
    state.expenses = []
    state.monthlyReports = []
  },
  addUserItem (state, data) {
    const userItemType = data.type
    const userItem = { ...data }
    delete userItem.type
    state[userItemType] = [...state[userItemType], userItem]
  },
  editUserItem (state, data) {
    console.log('editing', data)
    const userItemType = data.type
    const userItem = { ...data }
    let itemIndex
    state[userItemType].find((item, index) => {
      if (item._id === data._id) {
        itemIndex = index
      }
    })
    delete userItem.type
    Vue.set(state[userItemType], itemIndex, userItem)
    console.log('item edited')
    // state[userItemType][itemIndex] = data
  },
  deleteUserItem (state, data) {
    console.log('deleting user item')
    state[data.userItemType] = state[data.userItemType].filter(i => i._id !== data._id)
  },
  addGoal (state, goal) {
    state.goal = goal
  },
  addTransaction (state, user) {
    state.wallets = user.wallets
    state.incomes = user.incomes
    state.expenses = user.expenses
    state.monthlyReports = user.monthlyReports
  },
  deleteTransaction (state, user) {
    state.wallets = user.wallets
    state.incomes = user.incomes
    state.expenses = user.expenses
    state.monthlyReports = user.monthlyReports
  }
}

const actions = {
  addIncome: async function ({ commit }, income) {
    const graphqlQuery = addIncomeQuery(income)
    try {
      const response = await axios.post('/', graphqlQuery)
      const resData = response.data.data.addIncome
      resData.type = 'incomes'
      resData.nextPayout = new Date(resData.nextPayout)
      commit('addUserItem', resData)
      return true
    } catch (err) {
      console.log(err.response)
      return false
    }
  },
  editIncome: async function ({ commit }, income) {
    const graphqlQuery = editIncomeQuery(income)
    try {
      const response = await axios.post('', graphqlQuery)
      const resData = response.data.data.editIncome
      resData.nextPayout = new Date(resData.nextPayout)
      resData.type = 'incomes'
      commit('editUserItem', resData)
      return true
    } catch (err) {
      console.log(err.response)
      return false
    }
  },
  deleteIncome: async function ({ commit }, expenseId) {
    const graphqlQuery = deleteIncomeQuery(expenseId)
    try {
      const response = await axios.post('', graphqlQuery)
      const resData = response.data.data.deleteIncome
      if (resData === 'success') {
        const data = {
          userItemType: 'incomes',
          _id: expenseId
        }
        commit('deleteUserItem', data)
      }
    } catch (err) {
      console.log(err.response)
      return false
    }
  },
  addExpense: async function ({ commit }, expense) {
    const graphqlQuery = addExpenseQuery(expense)
    try {
      const response = await axios.post('', graphqlQuery)
      const resData = response.data.data.addExpense
      resData.type = 'expenses'
      commit('addUserItem', resData)
      return true
    } catch (err) {
      console.log(err.response)
      commit('addError', err.response.data.errors[0].message)
      return false
    }
  },
  editExpense: async function ({ commit }, expense) {
    const graphqlQuery = editExpenseQuery(expense)
    try {
      const response = await axios.post('', graphqlQuery)
      const resData = response.data.data.editExpense
      resData.type = 'expenses'
      commit('editUserItem', resData)
      return true
    } catch (err) {
      console.log(err.response)
      return false
    }
  },
  deleteExpense: async function ({ commit }, expenseId) {
    const graphqlQuery = deleteExpenseQuery(expenseId)
    try {
      const response = await axios.post('', graphqlQuery)
      const resData = response.data.data.deleteExpense
      if (resData.success === 'true') {
        const data = {
          userItemType: 'expenses',
          _id: resData.deletedId
        }
        commit('deleteUserItem', data)
      }
    } catch (err) {
      console.log(err.response)
      return false
    }
  },
  addTransaction: async function ({ commit }, transaction) {
    const graphqlQuery = addTransactionQuery(transaction)
    try {
      const response = await axios.post('', graphqlQuery)
      const resData = response.data.data.addTransaction
      commit('addTransaction', resData)
      return true
    } catch (err) {
      console.log(err.response)
      return false
    }
  },
  editTransaction: async function ({ commit }, transaction) {
    const graphqlQuery = editTransactionQuery(transaction)
    try {
      const response = await axios.post('', graphqlQuery)
      const resData = response.data.data.editTransaction
      commit('addTransaction', resData)
      return true
    } catch (err) {
      console.log('error editing transaction', err.response)
      return false
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
