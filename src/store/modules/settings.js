const state = {
  theme: null,
  currentSettingView: null,
  showSettingsPannel: false
}

const getters = {
  currentTheme: state => {
    return state.theme
  },
  currentSettingView: state => {
    return state.currentSettingView
  },
  currentSettingsPannelState: state => {
    return state.showSettingsPannel
  }
}

const mutations = {
  setTheme (state, theme) {
    state.theme = theme
  },
  setCurrentView (state, view) {
    state.currentSettingView = view
  },
  toggleSettingsPannel (state) {
    state.showSettingsPannel = !state.showSettingsPannel
  }

}

export default {
  state,
  getters,
  mutations
}
