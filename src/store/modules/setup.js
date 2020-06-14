import axios from 'axios'

const state = {
  setupType: 'general', // GENERAL OR BUDGET - BUDGET IS OPTIONNAL
  // setupType: 'budget',
  currentSetupStep: 'currency',
  // currentSetupStep: 'expenses',
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

const actions = {
  finishSetup: async function ({ commit }) {
    const query = {
      query: `mutation {
        finishSetup {
            activeDate
            settings {
              dashboardLayout {
                x
                y
                w
                h
                i
                displayed
                ghostMode
              }
          }
        }
      }`
    }
    try {
      const response = await axios.post('/', query)
      const resData = response.data.data.finishSetup
      commit('initDashboardLayout', resData.settings.dashboardLayout)
      commit('setAppStatus', 'active')
      commit('setIsAppReadyToTrue')
      commit('setActiveDate', resData.activeDate)
    } catch (err) {
      console.log(err.response)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
