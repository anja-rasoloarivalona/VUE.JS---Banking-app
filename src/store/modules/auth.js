import { loginQuery, signupQuery } from '@/graphQL/authQuery'
import axios from 'axios'

const state = {
  isAuth: false,
  token: null,
  userId: null,
  userName: null,
  userEmail: null,
  userPassword: null,
  userStatus: null,
  appStatus: 'authentication'
}

const getters = {
  currentAppStatus: state => {
    return state.appStatus
  }
}

const mutations = {
  setIsAuthToTrue (state, authData) {
    state.isAuth = true
    state.token = authData.token
    state.userId = authData.userId
    state.userName = authData.userName
    state.userEmail = authData.userEmail
    state.userPassword = authData.userPassword
    state.userStatus = authData.userStatus
    state.appStatus = authData.appStatus
    localStorage.setItem('bank-data', JSON.stringify(authData))
  },
  setAppStatus (state, newStatus) {
    state.appStatus = newStatus
  },
  setUserStatus (state, newStatus) {
    state.userStatus = newStatus
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

const actions = {
  login: async function ({ commit }, input) {
    const graphqlQuery = loginQuery(input)
    try {
      const response = await axios.post('', graphqlQuery)
      const resData = response.data.data.login
      const remainingMilliseconds = 24 * 60 * 60 * 1000
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds).toISOString()
      const data = {
        token: resData.token,
        userId: resData.user._id,
        userName: resData.user.name,
        userEmail: resData.user.email,
        userPassword: resData.user.password,
        userStatus: resData.user.status,
        appStatus: resData.user.status === 'created' ? 'welcome' : 'running',
        expiryDate: expiryDate
      }
      commit('setIsAuthToTrue', data)
      commit('initAppData', resData.user)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  },
  signup: async function ({ commit }, input) {
    const graphqlQuery = signupQuery(input)
    try {
      const response = axios.post('', graphqlQuery)
      const resData = response.data.data.createUser
      const remainingMilliseconds = 24 * 60 * 60 * 1000
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds).toISOString()
      const data = {
        token: resData.token,
        userId: resData.user._id,
        userName: resData.user.name,
        userStatus: resData.user.status,
        appStatus: 'welcome',
        expiryDate: expiryDate
      }
      commit('setIsAuthToTrue', data)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
