const state = {
  theme: null,
  previousTheme: null,
  currentSettingView: null,
  showSettingsPannel: false
}

const getters = {
  currentTheme: state => {
    return state.theme
  },
  previousTheme: state => {
    return state.previousTheme
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
  setPreviousTheme (state, theme) {
    state.previousTheme = theme
  },
  setCurrentView (state, view) {
    state.currentSettingView = view
  },
  showSettingsPannel (state) {
    state.showSettingsPannel = true
  },
  hideSettingsPannel (state) {
    state.showSettingsPannel = false
  }

}

export default {
  state,
  getters,
  mutations
}
