const state = {
  theme: 'green'
}

const getters = {
  currentTheme: state => {
    return state.theme
  }
}

const mutations = {
  setTheme (state, theme) {
    state.theme = theme
  }
}

export default {
  state,
  getters,
  mutations
}
