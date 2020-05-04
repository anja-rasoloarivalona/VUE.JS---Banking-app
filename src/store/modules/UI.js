const state = {
  isBackdropMounted: false,
  backdropModal: null,

  activeModal: null,
  displayModal: false
}

const getters = {
  modal: state => {
    return {
      isDisplayed: state.displayModal,
      active: state.activeModal
    }
  },

  backdropState: state => {
    return state.isBackdropMounted
  },
  backdropModal: state => {
    return state.backdropModal
  }
}

const mutations = {
  setModal (state, modal) {
    state.activeModal = modal
  },
  openModal (state, modal) {
    state.activeModal = modal
    state.displayModal = true
  },
  closeModal (state) {
    state.activeModal = null
    state.displayModal = false
  },

  openBackdrop (state, modal) {
    state.isBackdropMounted = true
    state.backdropModal = modal
  },
  closeBackdrop (state) {
    state.isBackdropMounted = false
    state.backdropModal = null
  },
  setModalView (state, modal) {
    state.backdropModal = modal
  }
}

export default {
  state,
  getters,
  mutations
}
