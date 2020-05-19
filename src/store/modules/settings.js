const state = {
  editingDashboard: false,
  editingTransaction: false,
  ghostMode: false,
  currentDashboardLayout: [],
  defaultDashboardLayout: [],
  previousDashboardLayout: [],
  secondaryColors: ['#059782', '#99a1d7', '#2bac49', '#3144af', '#59bcd8']
}

const getters = {
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
  // GENERAL
  setSettings (state, data) {
    state.defaultDashboardLayout = data.dashboardLayout
    state.currentDashboardLayout = data.dashboardLayout
  },
  // THEME
  // setTheme (state, theme) {
  //   state.theme = theme
  //   localStorage.setItem('bank-theme', theme)
  //   const htmlElement = document.documentElement
  //   htmlElement.setAttribute('theme', theme)
  // },
  // setPreviousTheme (state, theme) {
  //   console.log('setting previous theme', theme)
  //   state.previousTheme = theme
  // },
  // DASHBOARD
  setDefaultDashboardLayout (state, layout) {
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
