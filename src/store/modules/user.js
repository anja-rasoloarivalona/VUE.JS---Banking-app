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
    const transactions = {}
    state.incomes.forEach(income => {
      transactions[income.name] = {
        ...income,
        transactionType: 'income'
      }
    })
    state.expenses.forEach(expense => {
      transactions[expense.name] = {
        ...expense,
        transactionType: 'expense'
      }
    })
    return transactions
  },
  walletsNameAndId: state => {
    const wallets = {}
    state.wallets.forEach(wallet => {
      if (wallet.supplier) {
        wallets[`${wallet.walletType} - ${wallet.supplier}`] = wallet._id
      } else {
        wallets[`${wallet.walletType}`] = wallet._id
      }
    })
    return wallets
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

  addUserItem (state, data) {
    const userItemType = data.type
    const userItem = { ...data }
    delete userItem.type
    state[userItemType] = [...state[userItemType], userItem]
  }
}

export default {
  state,
  getters,
  mutations
}
