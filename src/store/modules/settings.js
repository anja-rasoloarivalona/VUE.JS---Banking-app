const state = {
  editingTransaction: false,
  ghostMode: false,
  secondaryColors: ['#059782', '#99a1d7', '#2bac49', '#3144af', '#59bcd8'],
  frequencyOptions: {
    counter: {
      once: 1,
      twice: 2,
      'three times': 3,
      'four times': 4,
      'five times': 5
    },
    period: {
      'a day': 30,
      'a week': 4,
      'every two weeks': 2,
      'a month': 1,
      'a year': 1 / 12
    }
  }
}

const getters = {
  secondaryColors: state => {
    return state.secondaryColors
  },
  frequencyOptions: state => {
    return state.frequencyOptions
  },
  isGhostModeActivated: state => {
    return state.ghostMode
  },
  isEditingTransaction: state => {
    return state.editingTransaction
  }
}

const mutations = {
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
