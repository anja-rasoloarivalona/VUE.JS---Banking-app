const state = {
  errors: []
}

const getters = {
  errors: state => {
    return {
      data: state.errors
    }
  }
}

const mutations = {
  addError (state, error) {
    state.errors.push(error)
  },
  removeError (state, errorIndex) {
    if (state.errors.length > 1) {
      state.errors = state.errors.splice(errorIndex, 1)
    } else {
      state.errors = []
    }
  }
}
export default {
  state,
  mutations,
  getters
}
