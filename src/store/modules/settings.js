const state = {
  theme: null,
  previousTheme: null,
  editingDashboard: false,
  editingTransaction: false,
  ghostMode: false,
  currentDashboardLayout: [],
  defaultDashboardLayout: [],
  previousDashboardLayout: [],
  secondaryColors: ['#059782', '#99a1d7', '#2bac49', '#3144af', '#59bcd8']
}

const getters = {
  currentTheme: state => {
    return state.theme
  },
  previousTheme: state => {
    return state.previousTheme
  },
  localTheme: () => {
    return localStorage.getItem('bank-theme')
  },
  secondaryColors: state => {
    return state.secondaryColors
  },
  isGhostModeActivated: state => {
    return state.ghostMode
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
  // THEME
  setTheme (state, theme) {
    state.theme = theme
    localStorage.setItem('bank-theme', theme)
    const htmlElement = document.documentElement
    htmlElement.setAttribute('theme', theme)
  },
  setPreviousTheme (state, theme) {
    state.previousTheme = theme
  },
  // DASHBOARD
  setDefaultDashboardLayout (state, layout) {
    console.log('fired', layout)
    state.defaultDashboardLayout = layout
  },
  setCurrentDashboardLayout (state, layout) {
    state.currentDashboardLayout = layout
  },
  setEditDashboardToTrue (state) {
    state.editingDashboard = true
  },
  setEditDashboardToFalse (state) {
    state.editingDashboard = false
  },

  // TRANSACTION
  editTransaction (state, transaction) {
    state.editingTransaction = transaction
  },
  resetEditTransaction (state) {
    state.editingTransaction = false
  },
  // GHOST MODE
  activateGhostMode (state) {
    state.ghostMode = true
  },
  deactivateGhostMode (state) {
    state.ghostMode = false
  }

}

export default {
  state,
  getters,
  mutations
}
