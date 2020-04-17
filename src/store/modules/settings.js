const state = {
  theme: null,
  previousTheme: null,
  editingDashboard: false,
  editingTransaction: false
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
  editTransaction (state, transaction) {
    state.editingTransaction = transaction
  },
  resetEditTransaction (state) {
    state.editingTransaction = false
  }

}

export default {
  state,
  getters,
  mutations
}
