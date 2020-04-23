const state = {
  theme: null,
  previousTheme: null,
  editingDashboard: false,
  editingTransaction: false,
  currentDashboardLayout: [],
  defaultDashboardLayout: [],
  previousDashboardLayout: []
}

const getters = {
  currentTheme: state => {
    return state.theme
  },
  previousTheme: state => {
    return state.previousTheme
  },
  isEditingDashboard: state => {
    return state.editingDashboard
  },
  dashboardData: state => {
    return {
      currentDashboardLayout: state.currentDashboardLayout,
      defaultDashboardLayout: state.defaultDashboardLayout,
      previousDashboardLayout: state.defaultDashboardLayout
    }
  },
  isEditingTransaction: state => {
    return state.editingTransaction
  }
}

const mutations = {
  setTheme (state, theme) {
    state.theme = theme
  },
  setPreviousTheme (state, theme) {
    state.previousTheme = theme
  },
  setDefaultDashboardLayout (state, data) {
    const layout = [
      { x: 0, y: 0, w: 4, h: 6, i: 'balance' },
      { x: 0, y: 6, w: 8, h: 0, i: 'budget' },
      { x: 8, y: 0, w: 4, h: 5, i: 'wallet' },
      { x: 0, y: 12, w: 8, h: 6, i: 'transactions' },
      { x: 4, y: 0, w: 4, h: 6, i: 'goal' },
      { x: 4, y: 0, w: 4, h: 6, i: 'monthly' },
      { x: 0, y: 12, w: 8, h: 12, i: 'history' },
      { x: 0, y: 6, w: 4, h: 6, i: 'available' },
      { x: 8, y: 0, w: 4, h: 12, i: 'expenses' }
    ]
    let budgetHeight = 3
    data.expenses.forEach(expense => {
      if (expense.expenseType === 'variable') {
        budgetHeight = budgetHeight + 3
      }
    })
    layout.find((item, index) => {
      if (item.i === 'budget') {
        layout[index].h = budgetHeight
      }
      if (item.i === 'wallet') {
        layout[index].h = 4 + (data.wallets.length * 7)
      }
      if (item.i === 'transactions') {
        layout[index].h = 6 + (2 * 3)
      }
    })
    state.defaultDashboardLayout = layout
    console.log('set dafaukt', data)
    state.currentDashboardLayout = layout
  },
  editDashboard (state) {
    state.editingDashboard = true
  },
  setCurrentDashboardLayout (state, layout) {
    state.currentDashboardLayout = layout
  },
  setPreviousDashboardLayout (state, layout) {
    state.previousDashboardLayout = layout
  },
  editTransaction (state, transaction) {
    state.editingTransaction = transaction
  },
  resetEditTransaction (state) {
    state.editingTransaction = false
  },
  resetEditDashboard (state) {
    state.editingDashboard = false
  }

}

export default {
  state,
  getters,
  mutations
}
