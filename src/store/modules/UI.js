const state = {
  displayBackdrop: false,
  displaySettingsModal: false,
  activeSettingsModal: 'general',
  activeBackdrop: null,
  editedIncome: null,
  editedExpense: null,
  editedWallet: null
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
  },
  editedWallet: state => {
    return state.editedWallet
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
  setEditedWallet (state, editedWallet) {
    state.editedWallet = editedWallet
  },
  closeBackdrop (state) {
    console.log('closing backdrop')
    state.displayBackdrop = false
    state.displaySettingsModal = false
    state.activeSettingsModal = 'general'
    state.activeBackdrop = null
    state.editedIncome = null
    state.editedExpense = null
    state.editedWallet = null
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
