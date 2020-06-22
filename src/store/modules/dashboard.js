import { updateDashboardLayoutQuery } from '@/graphQL/dashboardQuery'
import axios from 'axios'

const state = {
  defaultLayout: [
    { x: 0, y: 0, w: 4, h: 6, i: 'balance', displayed: true, ghostMode: 'hide' },
    { x: 8, y: 30, w: 4, h: 20, i: 'calendar', displayed: true, ghostMode: 'display' },
    { x: 0, y: 12, w: 8, h: 9, i: 'budget', displayed: true, ghostMode: 'hide' },
    { x: 8, y: 12, w: 4, h: 18, i: 'wallet', displayed: true, ghostMode: 'hide' },
    { x: 0, y: 34, w: 8, h: 16, i: 'transactions', displayed: true, ghostMode: 'hide' },
    { x: 4, y: 6, w: 4, h: 6, i: 'goal', displayed: true, ghostMode: 'display' },
    { x: 4, y: 0, w: 4, h: 6, i: 'monthly', displayed: true, ghostMode: 'hide' },
    { x: 0, y: 21, w: 8, h: 13, i: 'history', displayed: true, ghostMode: 'display' },
    { x: 0, y: 6, w: 4, h: 6, i: 'available', displayed: true, ghostMode: 'hide' },
    { x: 8, y: 0, w: 4, h: 12, i: 'expenses', displayed: true, ghostMode: 'display' }
  ],
  currentLayout: [],
  previousLayout: [],
  isBeingEdited: false
}

const getters = {
  dashboard: (state, getters, rootState) => {
    const layout = [...state.defaultLayout]
    layout.find((item, index) => {
      if (item.i === 'budget') {
        let budgetHeight = 3
        rootState.user.expenses.forEach(expense => {
          if (expense.expenseType === 'variable') {
            budgetHeight = budgetHeight + 3
          }
        })
        layout[index].h = budgetHeight > 9 ? budgetHeight : 9
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
    state.previousLayout = [...state.currentLayout]
  },
  cancelNewLayout (state) {
    const prevLayout = []
    state.previousLayout.forEach(item => {
      prevLayout.push({ ...item })
    })
    state.currentLayout = prevLayout
  },
  resetDashboardLayout (state) {
    state.currentLayout = state.defaultLayout
    state.previousLayout = state.defaultLayout
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
