import { updateDashboardLayoutQuery } from '@/graphQL/dashboardQuery'
import axios from 'axios'

const state = {
  defaultLayout: [
    { x: 0, y: 0, w: 4, h: 6, i: 'balance', minH: 6, minW: 3, displayed: true, ghostMode: 'hide' },
    { x: 8, y: 30, w: 4, h: 20, i: 'calendar', minH: 20, minW: 4, displayed: true, ghostMode: 'display' },
    { x: 0, y: 12, w: 8, h: 9, i: 'budget', minH: 9, minW: 8, displayed: true, ghostMode: 'hide' },
    { x: 8, y: 12, w: 4, h: 18, i: 'wallet', minH: 18, minW: 4, displayed: true, ghostMode: 'hide' },
    { x: 0, y: 34, w: 8, h: 16, i: 'transactions', minW: 8, minH: 16, displayed: true, ghostMode: 'hide' },
    { x: 4, y: 6, w: 4, h: 6, i: 'goal', minH: 6, minW: 4, displayed: true, ghostMode: 'display' },
    { x: 4, y: 0, w: 4, h: 6, i: 'monthly', minH: 6, minW: 3, displayed: true, ghostMode: 'hide' },
    { x: 0, y: 21, w: 8, h: 13, i: 'history', minH: 13, minW: 8, displayed: true, ghostMode: 'display' },
    { x: 0, y: 6, w: 4, h: 6, i: 'available', minH: 6, minW: 3, displayed: true, ghostMode: 'hide' },
    { x: 8, y: 0, w: 4, h: 12, i: 'expenses', minH: 12, minW: 4, displayed: true, ghostMode: 'display' }
  ],
  currentLayout: [],
  previousLayout: [],
  isBeingEdited: false
}

const getters = {
  dashboard: (state, getters, rootState) => {
    const layout = [...state.defaultLayout]

    let variableBudgetCounter = 0
    rootState.user.expenses.forEach(expense => {
      if (expense.expenseType === 'variable') {
        variableBudgetCounter++
      }
    })
    const budgetHeight = variableBudgetCounter > 3 ? 9 + ((variableBudgetCounter - 3) * 3) : 0

    layout.find((item, index) => {
      if (item.i === 'budget') {
        layout[index].h = budgetHeight
        layout[index].minH = budgetHeight
      }
      if (item.i === 'wallet') {
        layout[index].h = rootState.user.wallets.length > 1 ? 4 + (rootState.user.wallets.length * 7) : 18
      }
    })
    return {
      ...state,
      defaultLayout: layout
    }
  }
}

const mutations = {
  // LAYOUT MUTATIONS
  initDashboardLayout (state, layout) {
    const currentLayout = []
    const previousLayout = []
    layout.forEach(item => {
      currentLayout.push({ ...item })
      previousLayout.push({ ...item })
    })
    state.currentLayout = [...currentLayout]
    state.previousLayout = [...previousLayout]
  },
  tryNewLayout (state, layout) {
    const newLayout = []
    layout.forEach(item => {
      newLayout.push({ ...item })
    })
    state.currentLayout = newLayout
  },
  saveNewLayout (state) {
    const layout = []
    state.currentLayout.forEach(item => {
      layout.push({ ...item })
    })
    state.previousLayout = layout
  },
  cancelNewLayout (state) {
    const prevLayout = []
    state.previousLayout.forEach(item => {
      prevLayout.push({ ...item })
    })
    state.currentLayout = prevLayout
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

  // EDIT MUTATIONS
  setDashboardIsBeingEditedToTrue (state) {
    state.isBeingEdited = true
  },
  setDashboardIsBeingEditedTofalse (state) {
    state.isBeingEdited = false
    // state.currentLayout = state.previousLayout
  }
}

const actions = {
  async updateDashboardLayout ({ commit }, layout) {
    const graphqlQuery = updateDashboardLayoutQuery(layout)
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
