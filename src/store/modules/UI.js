const state = {
  displayModal: false,
  activeModal: null,
  displayBackdrop: false
}

const getters = {
  modal: state => {
    return {
      isDisplayed: state.displayModal,
      active: state.activeModal
    }
  },
  backdrop: state => {
    return {
      isDisplayed: state.displayBackdrop
    }
  }
}

const mutations = {
  setModal (state, modal) {
    state.activeModal = modal
  },
  openModal (state, modal) {
    state.displayBackdrop = true
    state.activeModal = modal
    state.displayModal = true
  },
  closeBackdrop (state) {
    state.displayBackdrop = false
    state.displayModal = false
    state.activeModal = null
  }
}

export default {
  state,
  getters,
  mutations
}
