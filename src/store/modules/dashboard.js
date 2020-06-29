import { updateDashboardLayoutQuery } from '@/graphQL/dashboardQuery'
import axios from 'axios'

const state = {
  defaultLayout: {
    available: { x: 0, y: 6, w: 4, h: 6, minH: 6, minW: 3, displayed: true, ghostMode: 'hide', i: 'available' },
    balance: { x: 0, y: 0, w: 4, h: 6, minH: 6, minW: 3, displayed: true, ghostMode: 'hide', i: 'balance' },
    budget: { x: 0, y: 12, w: 8, h: 9, minH: 9, minW: 8, displayed: true, ghostMode: 'hide', i: 'budget' },
    calendar: { x: 8, y: 30, w: 4, h: 20, minH: 20, minW: 4, displayed: true, ghostMode: 'display', i: 'calendar' },
    expenses: { x: 8, y: 0, w: 4, h: 12, minH: 12, minW: 4, displayed: true, ghostMode: 'display', i: 'expenses' },
    goal: { x: 4, y: 6, w: 4, h: 6, minH: 6, minW: 4, displayed: true, ghostMode: 'display', i: 'goal' },
    history: { x: 0, y: 21, w: 8, h: 13, minH: 13, minW: 8, displayed: true, ghostMode: 'display', i: 'history' },
    monthly: { x: 4, y: 0, w: 4, h: 6, minH: 6, minW: 3, displayed: true, ghostMode: 'hide', i: 'monthly' },
    transactions: { x: 0, y: 34, w: 8, h: 16, minW: 8, minH: 16, displayed: true, ghostMode: 'hide', i: 'transactions' },
    wallet: { x: 8, y: 12, w: 4, h: 18, minH: 18, minW: 4, displayed: true, ghostMode: 'hide', i: 'wallet' }
  },
  currentLayout: {},
  previousLayout: {},
  isBeingEdited: false
}

const getters = {
  dashboard: (state) => {
    const defaultLayout = []
    const current = []
    const prev = []
    for (const key in state.defaultLayout) {
      defaultLayout.push({ ...state.defaultLayout[key] })
    }
    for (const key in state.currentLayout) {
      current.push({ ...state.currentLayout[key] })
    }
    for (const key in state.prevLayout) {
      prev.push({ ...state.prevLayout[key] })
    }
    return {
      ...state,
      defaultLayout: defaultLayout,
      currentLayout: current,
      previousLayout: prev
    }
  }
}

const mutations = {
  // LAYOUT MUTATIONS
  initDashboardLayout (state, layout) {
    const current = {}
    const prev = {}
    layout.forEach(item => {
      current[item.i] = { ...item }
      prev[item.i] = { ...item }
    })
    state.currentLayout = { ...current }
    state.previousLayout = { ...prev }
  },
  tryNewLayout (state, layout) {
    const newLayout = {}
    layout.forEach(item => {
      newLayout[item.i] = { ...item }
    })
    state.currentLayout = { ...newLayout }
  },
  saveNewLayout (state) {
    const newLayout = {}
    for (const key in state.currentLayout) {
      newLayout[key] = { ...state.currentLayout[key] }
    }
    state.previousLayout = newLayout
    state.isBeingEdited = false
  },
  cancelNewLayout (state) {
    const layout = {}
    for (const key in state.previousLayout) {
      layout[key] = { ...state.previousLayout[key] }
    }
    state.currentLayout = { ...layout }
    state.isBeingEdited = false
  },
  resetDashboardLayout (state) {
    const current = {}
    const prev = {}
    for (const key in state.defaultLayout) {
      current[key] = { ...state.defaultLayout[key] }
      prev[key] = { ...state.defaultLayout[key] }
    }
    state.currentLayout = { ...current }
    state.previousLayout = { ...prev }
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
    const budgetHeight = variableBudgetCounter > 3 ? 9 + ((variableBudgetCounter - 3) * 3) : 9
    state.defaultLayout.budget.h = budgetHeight
    state.defaultLayout.budget.minH = budgetHeight
    state.currentLayout.budget.h = budgetHeight
    state.currentLayout.budget.minH = budgetHeight
    state.previousLayout.budget.h = budgetHeight
    state.previousLayout.budget.minH = budgetHeight

    const walletHeight = user.wallets.length > 1 ? 4 + (user.wallets.length * 7) : 18
    state.defaultLayout.wallet.h = walletHeight
    state.defaultLayout.wallet.minH = walletHeight
    state.currentLayout.wallet.h = walletHeight
    state.currentLayout.wallet.minH = walletHeight
    state.previousLayout.wallet.h = walletHeight
    state.previousLayout.wallet.minH = walletHeight
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
