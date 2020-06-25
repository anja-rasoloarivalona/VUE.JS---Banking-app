import { setCurrency } from '@/graphQL/settingsQuery'
import axios from 'axios'

const state = {
  currentLanguage: 'en',
  currentCurrency: '',
  editingTransaction: false,
  ghostMode: false,
  secondaryColors: ['#059782', '#99a1d7', '#2bac49', '#3144af', '#59bcd8'],
  frequencyOptions: {
    counter: {
      once: 1,
      twice: 2,
      'three times': 3,
      'four times': 4,
      'five times': 5
    },
    period: {
      'a day': 30,
      'a week': 4,
      'every two weeks': 2,
      'a month': 1,
      'a year': 1 / 12
    }
  },
  frequencyOptionsi18: {
    counter: {
      once: 'once',
      twice: 'twice',
      'three times': 'threeTimes',
      'four times': 'fourTimes',
      'five times': 'fiveTimes',
      'six times': 'sixTimes'
    },
    period: {
      'a day': 'perDay',
      'a week': 'perWeek',
      'every two weeks': 'everyTwoWeeks',
      'a month': 'perMonth',
      'a year': 'perYear'
    }
  }
}

const getters = {
  secondaryColors: state => {
    return state.secondaryColors
  },
  frequencyOptions: state => {
    return state.frequencyOptions
  },
  frequencyOptionsi18: state => {
    return state.frequencyOptionsi18
  },
  ghostModeIsEnabled: state => {
    return state.ghostMode
  },
  isEditingTransaction: state => {
    return state.editingTransaction
  },
  currentLanguage: state => {
    return state.currentLanguage
  },
  currentCurrency: state => {
    return state.currentCurrency
  }
}

const mutations = {
  // TRANSACTION
  editTransaction (state, transaction) {
    state.editingTransaction = transaction
  },
  resetEditTransaction (state) {
    state.editingTransaction = false
  },
  // GHOST MODE
  activateGhostMode (state) {
    state.ghostMode = true
  },
  deactivateGhostMode (state) {
    state.ghostMode = false
  },
  setLanguage (state, lang) {
    state.currentLanguage = lang
  },
  initCurrency (state, currency) {
    state.currentCurrency = currency
  },
  resetSettingsData (state) {
    state.currentCurrency = ''
    state.editingTransaction = false
    state.ghostMode = false
  }

}

const actions = {
  setCurrency: async function ({ commit }, currency) {
    const graphqlQuery = setCurrency(currency)
    try {
      const response = await axios.post('/', graphqlQuery)
      const resData = response.data.data.setCurrency
      if (resData === 'success') {
        commit('initCurrency', currency)
        return true
      }
    } catch (err) {
      console.log('set currency error ', err.response)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
