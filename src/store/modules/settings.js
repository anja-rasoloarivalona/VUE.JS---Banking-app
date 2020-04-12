const state = {
  theme: null,
  previousTheme: null
}

const getters = {
  currentTheme: state => {
    return state.theme
  },
  previousTheme: state => {
    return state.previousTheme
  }
}

const mutations = {
  setTheme (state, theme) {
    state.theme = theme
  },
  setPreviousTheme (state, theme) {
    state.previousTheme = theme
  }

}

export default {
  state,
  getters,
  mutations
}
