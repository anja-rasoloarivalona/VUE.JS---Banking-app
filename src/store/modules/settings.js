const state = {
  theme: 'green',
  currentSettingView: null
}

const getters = {
  currentTheme: state => {
    return state.theme
  },
  currentSettingView: state => {
    return state.currentSettingView
  }
}

const mutations = {
  setTheme (state, theme) {
    state.theme = theme
  },
  setCurrentView (state, view) {
    state.currentSettingView = view
  }

}

export default {
  state,
  getters,
  mutations
}
