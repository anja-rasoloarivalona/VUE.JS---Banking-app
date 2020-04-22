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
      { x: 0, y: 0, w: 4, h: 6, i: 'dashboard-balance' },
      { x: 0, y: 6, w: 8, h: 0, i: 'dashboard-budget' },
      { x: 8, y: 0, w: 4, h: 5, i: 'dashboard-wallet' },
      { x: 0, y: 12, w: 8, h: 6, i: 'dashboard-transactions' },
      { x: 4, y: 0, w: 4, h: 6, i: 'dashboard-goal' },
      { x: 4, y: 0, w: 4, h: 6, i: 'dashboard-monthly-report' },
      { x: 0, y: 12, w: 8, h: 12, i: 'dashboard-transactions-chart' },
      { x: 0, y: 6, w: 4, h: 6, i: 'dashboard-available-instantly' },
      { x: 8, y: 0, w: 4, h: 12, i: 'dashboard-expenses-chart' }
    ]
    let budgetHeight = 3
    data.expenses.forEach(expense => {
      if (expense.expenseType === 'variable') {
        budgetHeight = budgetHeight + 3
      }
    })
    layout.find((item, index) => {
      if (item.i === 'dashboard-budget') {
        layout[index].h = budgetHeight
      }
      if (item.i === 'dashboard-wallet') {
        layout[index].h = 4 + (data.wallets.length * 7)
      }
      if (item.i === 'dashboard-transactions') {
        layout[index].h = 6 + (2 * 3)
      }
    })
    state.defaultDashboardLayout = layout
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
