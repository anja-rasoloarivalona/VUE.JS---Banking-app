const state = {
  defaultTheme: 'light-green',
  currentTheme: null,
  previousTheme: null,
  secondaryColors: ['#059782', '#99a1d7', '#2bac49', '#3144af', '#59bcd8']
}

const getters = {
  theme: state => {
    return {
      ...state,
      isDark: state.currentTheme ? state.currentTheme.includes('dark') : state.defaultTheme.includes('dark'),
      isLight: state.currentTheme ? state.currentTheme.includes('light') : state.defaultTheme.includes('light'),
      mainColor: state.currentTheme ? state.currentTheme.split('-')[1] : state.defaultTheme.split('-')[1]
    }
  }
}

const mutations = {
  initTheme (state) {
    const theme = localStorage.getItem('bank-theme') || state.defaultTheme
    state.currentTheme = theme
    state.previousTheme = theme
    localStorage.setItem('bank-theme', theme)
    document.documentElement.setAttribute('theme', theme)
  },
  setTheme (state, theme) {
    state.currentTheme = theme
    state.previousTheme = theme
    localStorage.setItem('bank-theme', theme)
    document.documentElement.setAttribute('theme', theme)
  },
  tryNewTheme (state, theme) {
    state.currentTheme = theme
    document.documentElement.setAttribute('theme', theme)
  },
  saveNewTheme (state) {
    const theme = state.currentTheme
    state.previousTheme = theme
    localStorage.setItem('bank-theme', theme)
  },
  cancelNewTheme (state) {
    state.currentTheme = state.previousTheme
    document.documentElement.setAttribute('theme', state.previousTheme)
  },
  resetTheme (state) {
    state.currentTheme = state.defaultTheme
    state.previousTheme = state.defaultTheme
    localStorage.setItem('bank-theme', state.defaultTheme)
    document.documentElement.setAttribute('theme', state.defaultTheme)
  }
}

export default {
  state,
  getters,
  mutations
}
