const state = {
  isBackdropMounted: false,
  backdropModal: null
}

const getters = {
  backdropState: state => {
    return state.isBackdropMounted
  },
  backdropModal: state => {
    return state.backdropModal
  }
}

const mutations = {
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
