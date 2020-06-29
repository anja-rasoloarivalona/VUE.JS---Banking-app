import { updateDashboardLayoutQuery } from '@/graphQL/dashboardQuery'
import axios from 'axios'
import Vue from 'vue'

const state = {
  defaultLayout: [
    { x: 0, y: 6, w: 4, h: 6, minH: 6, minW: 3, displayed: true, ghostMode: 'hide', i: 'available' },
    { x: 0, y: 0, w: 4, h: 6, minH: 6, minW: 3, displayed: true, ghostMode: 'hide', i: 'balance' },
    { x: 0, y: 12, w: 8, h: 9, minH: 9, minW: 8, displayed: true, ghostMode: 'hide', i: 'budget' },
    { x: 8, y: 30, w: 4, h: 20, minH: 20, minW: 4, displayed: true, ghostMode: 'display', i: 'calendar' },
    { x: 8, y: 0, w: 4, h: 12, minH: 12, minW: 4, displayed: true, ghostMode: 'display', i: 'expenses' },
    { x: 4, y: 6, w: 4, h: 6, minH: 6, minW: 4, displayed: true, ghostMode: 'display', i: 'goal' },
    { x: 0, y: 21, w: 8, h: 13, minH: 13, minW: 8, displayed: true, ghostMode: 'display', i: 'history' },
    { x: 4, y: 0, w: 4, h: 6, minH: 6, minW: 3, displayed: true, ghostMode: 'hide', i: 'monthly' },
    { x: 0, y: 34, w: 8, h: 16, minW: 8, minH: 16, displayed: true, ghostMode: 'hide', i: 'transactions' },
    { x: 8, y: 12, w: 4, h: 18, minH: 18, minW: 4, displayed: true, ghostMode: 'hide', i: 'wallet' }
  ],
  currentLayout: [],
  previousLayout: [],
  isBeingEdited: false
}

const getters = {
  dashboard: (state) => {
    return state
  }
}

const mutations = {
  // LAYOUT MUTATIONS
  initDashboardLayout (state, layout) {
    const current = []
    const prev = []
    layout.forEach(item => {
      current.push({ ...item })
      prev.push({ ...item })
      current[item.i] = { ...item }
      prev[item.i] = { ...item }
    })
    state.currentLayout = current
    state.previousLayout = prev
  },
  tryNewLayout (state, layout) {
    const current = []
    layout.forEach(item => {
      current.push({ ...item })
    })
    state.currentLayout = current
  },
  saveNewLayout (state) {
    const layout = []
    state.currentLayout.forEach(item => {
      layout.push({ ...item })
    })
    state.previousLayout = layout
    state.isBeingEdited = false
  },
  cancelNewLayout (state) {
    const layout = []
    state.previousLayout.forEach(item => {
      layout.push({ ...item })
    })
    state.currentLayout = layout
    state.isBeingEdited = false
  },
  resetDashboardLayout (state) {
    const current = []
    const prev = []
    state.defaultLayout.forEach(item => {
      current.push({ ...item })
      prev.push({ ...item })
    })
    state.currentLayout = current
    state.previousLayout = prev
    state.isBeingEdited = false
  },

  setDashboardIsBeingEditedToTrue (state) {
    state.isBeingEdited = true
  },
  setDashboardIsBeingEditedTofalse (state) {
    state.isBeingEdited = false
  },
  setDashboardLayout (state, user) {
    let variableBudgetCounter = 0
    user.expenses.forEach(expense => {
      if (expense.expenseType === 'Variable') {
        variableBudgetCounter++
      }
    })
    const budgetHeight = variableBudgetCounter > 3 ? 9 + ((variableBudgetCounter - 3) * 2) : 9
    const walletHeight = user.wallets.length > 1 ? 4 + (user.wallets.length * 7) : 18

    let defBudgetIndex, curBudgetIndex, prevBudgetIndex
    let defWalletIndex, curWalletIndex, prevWalletIndex

    let defBudget, defWallet
    state.defaultLayout.forEach((item, index) => {
      if (item.i === 'budget') {
        defBudgetIndex = index
        defBudget = { ...state.defaultLayout[index], h: budgetHeight, minH: budgetHeight }
      }
      if (item.i === 'wallet') {
        defWalletIndex = index
        defWallet = { ...state.defaultLayout[index], h: walletHeight, minH: walletHeight }
      }
    })
    Vue.set(state.defaultLayout, defBudgetIndex, defBudget)
    Vue.set(state.defaultLayout, defWalletIndex, defWallet)

    let curBudget, curWallet
    state.currentLayout.forEach((item, index) => {
      if (item.i === 'budget') {
        curBudgetIndex = index
        curBudget = { ...state.currentLayout[index], h: budgetHeight, minH: budgetHeight }
      }
      if (item.i === 'wallet') {
        curWalletIndex = index
        curWallet = { ...state.currentLayout[index], h: walletHeight, minH: walletHeight }
      }
    })
    Vue.set(state.currentLayout, curBudgetIndex, curBudget)
    Vue.set(state.currentLayout, curWalletIndex, curWallet)

    let prevBudget, prevWallet
    state.previousLayout.forEach((item, index) => {
      if (item.i === 'budget') {
        prevBudgetIndex = index
        prevBudget = { ...state.previousLayout[index], h: budgetHeight, minH: budgetHeight }
      }
      if (item.i === 'wallet') {
        prevWalletIndex = index
        prevWallet = { ...state.previousLayout[index], h: walletHeight, minH: walletHeight }
      }
    })
    Vue.set(state.previousLayout, prevBudgetIndex, prevBudget)
    Vue.set(state.previousLayout, prevWalletIndex, prevWallet)
  }
}

const actions = {
  async updateDashboardLayout ({ commit }, layout) {
    const graphqlQuery = updateDashboardLayoutQuery(layout)
    console.log('query', graphqlQuery)
    try {
      await axios.post('/', graphqlQuery)
      commit('saveNewLayout')
      return true
    } catch (err) {
      console.log('err edit dashboard layout', err.response)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
