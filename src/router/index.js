import Vue from 'vue'
import VueRouter from 'vue-router'
import Setup from '../views/Setup/Setup'
// import Starter from '../views/Starter/Starter'
import Dashboard from '../views/Dashboard/Dashboard'
import Profile from '../views/Profile/Profile'
import Report from '../views/Report/Report'
import Transactions from '../views/Transactions/Transactions'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    components: {
      default: Dashboard,
      setup: Setup
    }
  },
  {
    path: '/transactions',
    component: Transactions
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/report',
    component: Report
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(store.state.auth.isAuth)
  next()
})

export default router
