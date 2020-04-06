import { editIncomeQuery, addIncomeQuery } from '@/graphQL/incomeQuery'
import { editExpenseQuery, addExpenseQuery } from '@/graphQL/expenseQuery'
import { addTransactionQuery, editTransactionQuery } from '@/graphQL/transactionsQuery'
import axios from 'axios'

const state = {
  goal: null,
  balance: 0,
  wallets: [],
  incomes: [],
  expenses: [],
  monthlyReports: []
}

const getters = {
  usersIncomesAndExpenses: state => {
    const usersIncomesAndExpenses = {}
    state.incomes.forEach(income => {
      usersIncomesAndExpenses[income.name] = {
        ...income,
        transactionType: 'income'
      }
    })
    state.expenses.forEach(expense => {
      usersIncomesAndExpenses[expense.name] = {
        ...expense,
        transactionType: 'expense'
      }
    })
    const creditCards = ['Visa', 'MasterCard']
    state.wallets.forEach(wallet => {
      if (creditCards.includes(wallet.walletType)) {
        usersIncomesAndExpenses[`${wallet.walletType} ${wallet.supplier}`] = {
          ...wallet,
          transactionType: 'expense'
        }
      }
    })
    return usersIncomesAndExpenses
  },
  walletsNameAndId: state => {
    const wallets = {}
    state.wallets.forEach(wallet => {
      if (wallet.supplier) {
        wallets[`${wallet.walletType} ${wallet.supplier}`] = wallet._id
      } else {
        wallets[`${wallet.walletType}`] = wallet._id
      }
    })
    return wallets
  },
  userTransactions: state => {
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
  userBalance: state => {
    return state.balance
  },
  upcoming: state => {
    const datedTransactions = [...state.incomes]
    state.expenses.forEach(expense => {
      if (expense.expenseType === 'fixed') {
        datedTransactions.push(expense)
      }
    })
    let result = {
      name: datedTransactions[0].name,
      date: new Date(datedTransactions[0].nextPayout),
      value: datedTransactions[0].amount
    }
    datedTransactions.forEach(transaction => {
      if (new Date(transaction.nextPayout) < result.date) {
        result = {
          name: transaction.name,
          date: new Date(transaction.date),
          value: transaction.amount
        }
      }
    })
    return result
  }
}

const mutations = {
  initAppData (state, data) {
    state.wallets = data.wallets
    state.incomes = data.incomes
    state.expenses = data.expenses
    state.goal = data.goal
    state.monthlyReports = data.monthlyReports
  },

  initBalance (state, balance) {
    state.balance = balance
  },

  addUserItem (state, data) {
    const userItemType = data.type
    const userItem = { ...data }
    delete userItem.type
    state[userItemType] = [...state[userItemType], userItem]
  },

  editUserItem (state, data) {
    const userItemType = data.type
    const userItem = { ...data }
    let itemIndex
    state[userItemType].find((item, index) => {
      if (item._id === data._id) {
        itemIndex = index
      }
    })
    delete userItem.type
    state[userItemType][itemIndex] = data
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
      const response = await axios.post('', graphqlQuery)
      const resData = response.data.data.addIncome
      resData.type = 'incomes'
      resData.nextPayout = new Date(resData.nextPayout)
      commit('addUserItem', resData)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  },
  editIncome: async function ({ commit }, income) {
    const graphqlQuery = editIncomeQuery(income)
    try {
      const response = await axios.post('', graphqlQuery)
      const resData = response.data.data.editIncome
      resData.type = 'incomes'
      resData.nextPayout = new Date(resData.nextPayout)
      commit('editUserItem', resData)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  },
  addExpense: async function ({ commit }, expense) {
    const graphqlQuery = addExpenseQuery(expense)
    try {
      const response = axios.post('', graphqlQuery)
      const resData = response.data.data.addExpense
      resData.type = 'expenses'
      commit('addUserItem', resData)
      return true
    } catch (err) {
      console.log(err)
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
      console.log(err)
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
      console.log(err)
      return false
    }
  },
  editTransaction: async function ({ commit }, transaction) {
    console.log('before query', transaction)
    const graphqlQuery = editTransactionQuery(transaction)
    try {
      const response = await axios.post('', graphqlQuery)
      const resData = response.data.data.editTransaction
      commit('addTransaction', resData)
      return true
    } catch (err) {
      console.log(err)
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
