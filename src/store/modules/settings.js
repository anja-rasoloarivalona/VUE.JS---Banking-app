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
  setDefaultDashboardLayout (state, layout) {
    state.defaultDashboardLayout = layout
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
