import { loginQuery, signupQuery } from '@/graphQL/authQuery'
import axios from 'axios'

const state = {
  isAuth: false,
  authMode: 'login', // LOGION OR SIGNUP
  token: null,
  userId: null,
  userName: null,
  userEmail: null,
  userPassword: null,
  appStatus: 'auth'
}

const getters = {
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
  setAuthMode (state, mode) {
    state.authMode = mode
  },
  setIsAuthToTrue (state, authData) {
    state.isAuth = true
    state.token = authData.token
    state.userId = authData.userId
    state.userName = authData.userName
    state.userEmail = authData.userEmail
    state.userPassword = authData.userPassword
    state.appStatus = authData.appStatus
    localStorage.setItem('bank-data', JSON.stringify(authData))
  },
  setIsAuthToFalse (state) {
    state.isAuth = false
    state.token = null
    state.userId = null
    state.userName = null
    state.appStatus = 'auth'
    localStorage.removeItem('bank-data')
  },
  setAppStatus (state, newStatus) {
    state.appStatus = newStatus
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
        userPassword: resData.user.password,
        appStatus: resData.user.status,
        expiryDate: expiryDate
      }
      // commit('setIsAuthToTrue', data)
      // commit('initAppData', resData.user)
      return {
        success: true,
        authData: data,
        appData: resData.user
      }
    } catch (err) {
      return {
        success: false,
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
        appStatus: resData.user.status,
        expiryDate: expiryDate
      }
      axios.defaults.headers.common.Authorization = 'Bearer ' + resData.token
      commit('setIsAuthToTrue', data)
      return { succes: true }
    } catch (err) {
      return {
        succes: false,
        errors: err.response.data.errors
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
