import { loginQuery, signupQuery } from '@/graphQL/authQuery'
import axios from 'axios'
import router from '../../router'

const state = {
  authMode: 'login',
  appStatus: 'auth',
  expiryDate: '',
  isAuth: false,
  token: null,
  userEmail: null,
  userId: null,
  userName: null,
  isAppReady: false,
  isResettingPassword: false,
  activeDate: null
}

const getters = {
  auth: state => {
    return state
  },
  currentAppStatus: state => {
    return state.appStatus
  },
  isUserAuthed: state => {
    return state.isAuth
  },
  authMode: state => {
    return state.authMode
  },
  localData: () => {
    return localStorage.getItem('bank-data')
  }
}

const mutations = {
  initAuthData (state) {
    const authData = JSON.parse(localStorage.getItem('bank-data'))
    if (authData && new Date(authData.expiryDate) >= new Date()) {
      state.isAuth = true
      state.expiryDate = authData.expiryDate
      state.token = authData.token
      state.userId = authData.userId
      state.userName = authData.userName
      state.userEmail = authData.userEmail
      state.appStatus = authData.appStatus
      state.activeDate = authData.activeDate
      console.log('state', state)
    }
  },
  setAuthMode (state, mode) {
    state.authMode = mode
  },
  setIsAuthToTrue (state, authData) {
    state.isAuth = true
    state.token = authData.token
    state.userId = authData.userId
    state.userName = authData.userName
    state.userEmail = authData.userEmail
    state.appStatus = authData.appStatus
    state.activeDate = authData.activeDate
    axios.defaults.headers.common.Authorization = 'Bearer ' + authData.token
    localStorage.setItem('bank-data', JSON.stringify(authData))
  },
  setIsAuthToFalse (state) {
    state.isAuth = false
    state.token = null
    state.userId = null
    state.userName = null
    state.appStatus = 'auth'
    state.isAppReady = false
    state.activeDate = null
    axios.defaults.headers.common.Authorization = 'Bearer '
    localStorage.removeItem('bank-data')
    router.push('/')
  },
  setAppStatus (state, newStatus) {
    state.appStatus = newStatus
    const authData = JSON.parse(localStorage.getItem('bank-data'))
    authData.appStatus = newStatus
    localStorage.setItem('bank-data', JSON.stringify(authData))
  },
  setIsAppReadyToTrue () {
    state.isAppReady = true
  },
  setResettingPasswordToTrue (state) {
    state.isResettingPassword = true
  },
  setResettingPasswordToFalse (state) {
    state.isResettingPassword = false
  }
}

const actions = {
  login: async function ({ commit }, input) {
    const graphqlQuery = loginQuery(input)
    try {
      const response = await axios.post('/', graphqlQuery)
      const resData = response.data.data.login
      const remainingMilliseconds = 24 * 60 * 60 * 1000
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds).toISOString()
      const data = {
        token: resData.token,
        userId: resData.user._id,
        userName: resData.user.name,
        userEmail: resData.user.email,
        appStatus: resData.user.status,
        activeDate: resData.user.activeDate,
        expiryDate: expiryDate
      }
      commit('setIsAuthToTrue', data)
      commit('setUserData', resData.user)
      commit('setTheme', resData.user.settings.theme)
      commit('initDashboardLayout', resData.user.settings.dashboardLayout)
      commit('initCurrency', resData.user.settings.currency)
      setTimeout(() => commit('setIsAppReadyToTrue'), 1000)
      return {
        success: true
      }
    } catch (err) {
      console.log(err.response)
      return {
        errors: err.response.data.errors
      }
    }
  },
  signup: async function ({ commit }, input) {
    const graphqlQuery = signupQuery(input)
    try {
      const response = await axios.post('/', graphqlQuery)
      const resData = response.data.data.createUser
      const remainingMilliseconds = 24 * 60 * 60 * 1000
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds).toISOString()
      const data = {
        token: resData.token,
        userId: resData.user._id,
        userName: resData.user.name,
        userEmail: resData.user.email,
        appStatus: resData.user.status,
        expiryDate: expiryDate
      }
      axios.defaults.headers.common.Authorization = 'Bearer ' + resData.token
      commit('setIsAuthToTrue', data)
    } catch (err) {
      return {
        errors: err.response.data.errors
      }
    }
  },
  logout: function ({ commit }) {
    commit('setIsAuthToFalse')
    commit('clearUserData')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
