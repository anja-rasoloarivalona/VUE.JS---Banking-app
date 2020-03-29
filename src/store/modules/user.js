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
    return transactions
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

export default {
  state,
  getters,
  mutations
}
