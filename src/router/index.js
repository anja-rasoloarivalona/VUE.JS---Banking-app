import Vue from 'vue'
import VueRouter from 'vue-router'
import Starter from '../views/Starter/Starter'
import Dashboard from '../views/Dashboard/Dashboard'
import Transactions from '../views/Transactions/Transactions'
import Wallets from '../views/Wallets/Wallets'
import SavingsPlan from '../views/SavingsPlan/SavingsPlan'

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
    path: '/savings-plan',
    component: SavingsPlan
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
