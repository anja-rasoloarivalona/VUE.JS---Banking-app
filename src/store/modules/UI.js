const state = {
  displayBackdrop: false,
  displaySettingsModal: false,
  activeSettingsModal: 'general',
  activeBackdrop: null,
  editedIncome: null,
  editedExpense: null
}

const getters = {
  settingsModal: state => {
    return {
      isDisplayed: state.displaySettingsModal,
      active: state.activeSettingsModal
    }
  },
  backdrop: state => {
    return {
      isDisplayed: state.displayBackdrop,
      active: state.activeBackdrop
    }
  },
  editedIncome: state => {
    return state.editedIncome
  },
  editedExpense: state => {
    return state.editedExpense
  }
}

const mutations = {
  setSettingsModal (state, modal) {
    state.activeSettingsModal = modal
  },
  setEditedIncome (state, editedIncome) {
    state.editedIncome = editedIncome
  },
  setEditedExpense (state, editedExpense) {
    state.editedExpense = editedExpense
  },
  closeBackdrop (state) {
    state.displayBackdrop = false
    state.displaySettingsModal = false
    state.activeSettingsModal = 'general'
    state.activeBackdrop = null
    state.editedIncome = null
    state.editedExpense = null
  },
  openBackdrop (state, activeBackdrop) {
    state.displayBackdrop = true
    if (activeBackdrop) {
      state.activeBackdrop = activeBackdrop
    }
  }
}

export default {
  state,
  getters,
  mutations
}
