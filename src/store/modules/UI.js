const state = {
  showBackdrop: false,
  backdropModal: null
}

const getters = {
  currentBackdropState: state => {
    return {
      show: state.showBackdrop,
      modal: state.backdropModal
    }
  }
}

const mutations = {
  openBackdrop (state, modal) {
    state.showBackdrop = true
    state.backdropModal = modal
  },
  closeBackdrop (state) {
    state.showBackdrop = false
    state.backdropModal = null
  }
}

export default {
  state,
  getters,
  mutations
}
