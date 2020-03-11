import Vue from 'vue'
import VueRouter from 'vue-router'
import Starter from '../views/Starter/Starter.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import Transactions from '../views/Transactions.vue'
import Wallet from '../views/Wallet.vue'
import SavingsPlan from '../views/SavingsPlan.vue'

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
    component: Wallet
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
