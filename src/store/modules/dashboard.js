const state = {
  defaultLayout: [],
  currentLayout: [],
  previousLayout: [],
  isBeingEdited: false
}

const getters = {
  dashboard: state => {
    return state
  }
}

const mutations = {
  // LAYOUT MUTATIONS
  initDashboardLayout (state, layout) {
    state.defaultLayout = layout
    state.currentLayout = layout
    state.previousLayout = layout
  },
  tryNewLayout (state, layout) {
    state.currentLayout = layout
  },
  saveNewLayout (state) {
    state.previousLayout = state.currentLayout
  },
  cancelNewLayout (state) {
    state.currentLayout = state.previousLayout
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
    state.currentLayout = state.previousLayout
  }
}

export default {
  state,
  getters,
  mutations
}
