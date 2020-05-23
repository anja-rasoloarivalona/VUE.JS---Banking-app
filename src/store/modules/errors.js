const state = {
  errors: [],
  isNotEmpty: false
}

const getters = {
  errors: state => {
    return {
      data: state.errors,
      isNotEmpty: state.isNotEmpty
    }
  }
}

const mutations = {
  addError (state, error) {
    state.errors.push(error)
    state.isNotEmpty = true
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
