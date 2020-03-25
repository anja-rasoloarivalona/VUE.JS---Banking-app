const state = {
  isAuth: false,
  token: null,
  userId: null,
  userName: null,
  userStatus: null,
  appStatus: 'authentication'
}

const mutations = {
  setIsAuthToTrue (state, authData) {
    state.isAuth = true
    state.token = authData.token
    state.userId = authData.userId
    state.userName = authData.userName
    state.userStatus = authData.userStatus
    state.appStatus = authData.appStatus
    localStorage.setItem('bank-data', JSON.stringify(authData))
  },
  setAppStatus (state, newStatus) {
    state.appStatus = newStatus
  },
  setIsAuthToFalse (state) {
    state.isAuth = false
    state.token = null
    state.userId = null
    state.userName = null
    state.userStatus = null
    state.appStatus = 'authentication'
    localStorage.removeItem('bank-data')
  }
}

export default {
  state,
  mutations
}
