import Vue from 'vue'
import VueRouter from 'vue-router'
import Starter from '../views/Starter/Starter'
import Dashboard from '../views/Dashboard/Dashboard'
import Transactions from '../views/Transactions/Transactions'
import Wallets from '../views/Wallets/Wallets'
import Budget from '../views/Budget/Budget'
import Settings from '../views/Settings/Settings'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    components: {
      default: Dashboard,
      starter: Starter
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
    path: '/settings',
    component: Settings
    // component: Dashboard
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

export default router
