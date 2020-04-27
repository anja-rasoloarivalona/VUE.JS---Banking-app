const state = {
  currentSetupStep: 'wallets',
  steps: ['wallets', 'incomes', 'expenses', 'goal']
}

const getters = {
  currentSetupStep: state => {
    return state.currentSetupStep
  },
  setupSteps: state => {
    return state.steps
  }
}

export default {
  state,
  getters
}
