const state = {
  currentSetupStep: 'wallets',
  steps: ['wallets', 'incomes', 'expenses', 'goal'],
  displayWelcome: true
}

const getters = {
  currentSetupStep: state => {
    return state.currentSetupStep
  },
  setupSteps: state => {
    return state.steps
  },
  isWelcomeDisplayed: state => {
    return state.displayWelcome
  }
}

const mutations = {
  setCurrentSetupStep (state, step) {
    state.currentSetupStep = step
  }
}

export default {
  state,
  getters,
  mutations
}
