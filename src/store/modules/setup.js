const state = {
  // setupType: 'general', // GENERAL OR BUDGET - BUDGET IS OPTIONNAL
  setupType: 'budget',
  // currentSetupStep: 'currency',
  currentSetupStep: 'goal',
  generalSetupSteps: ['currency', 'wallets', 'budget'],
  budgetSetupSteps: ['currency', 'wallets', 'incomes', 'expenses', 'goal'],
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
  },
  setSetupType (state, type) {
    state.setupType = type
  }
}

export default {
  state,
  getters,
  mutations
}
