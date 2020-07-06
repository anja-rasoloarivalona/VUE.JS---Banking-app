import Vue from 'vue'
import VueRouter from 'vue-router'
import Setup from '../views/Setup/Setup'
// import Starter from '../views/Starter/Starter'
import Dashboard from '../views/Dashboard/Dashboard'
import Statistics from '../views/Statistics/Statistics'
import Transactions from '../views/Transactions/Transactions'
import Profile from '../views/Profile/Profile'
// import store from '../store'

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
    path: '/Profile',
    component: Profile
  },
  {
    path: '/transactions',
    component: Transactions
  },
  {
    path: '/statistics',
    component: Statistics
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
  next()
})

export default router
