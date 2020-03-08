import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Transactions from '../views/Transactions.vue'
import Wallet from '../views/Wallet.vue'
import SavingsPlan from '../views/SavingsPlan.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Dashboard
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
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
