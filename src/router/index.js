import Vue from 'vue'
import VueRouter from 'vue-router'
import Setup from '../views/Setup/Setup'
// import Starter from '../views/Starter/Starter'
import Dashboard from '../views/Dashboard/Dashboard'
import Transactions from '../views/Transactions/Transactions'
import Wallets from '../views/Wallets/Wallets'
import Budget from '../views/Budget/Budget'
import Calendar from '../views/Calendar/Calendar'
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
    path: '/wallet',
    component: Wallets
  },
  {
    path: '/budget',
    component: Budget
  },
  {
    path: '/calendar',
    component: Calendar
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
