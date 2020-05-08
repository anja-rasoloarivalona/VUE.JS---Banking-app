const state = {
  displayBackdrop: false,
  displaySettingsModal: false,
  activeSettingsModal: 'general',
  activeBackdrop: null
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
  }
}

const mutations = {
  setSettingsModal (state, modal) {
    state.activeSettingsModal = modal
  },
  // openSettingsModal (state, modal) {
  //   state.displayBackdrop = true
  //   state.displaySettingsModal = true
  //   state.activeSettingsModal = modal
  // },
  closeBackdrop (state) {
    state.displayBackdrop = false
    state.displaySettingsModal = false
    state.activeSettingsModal = 'general'
    state.activeBackdrop = null
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
