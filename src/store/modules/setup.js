const state = {
  setupType: 'general', // GENERAL OR BUDGET - BUDGET IS OPTIONNAL
  currentSetupStep: 'currency',
  generalSetupSteps: ['currency', 'wallets', 'budget'],
  budgetSetupSteps: ['wallets', 'incomes', 'expenses', 'goal'],
  displayWelcome: true
}

const getters = {
  setup: state => {
    return state
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
