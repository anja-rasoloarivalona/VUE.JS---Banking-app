<template>
  <div class="dashboard">
    <dashboard-layout>
      <template v-for="item in dashboard.currentLayout" v-slot:[item.i]>
        <transition :key="item.i" name="flip" mode="out-in">
            <component :is="item.ghostMode === 'hide' && ghostModeIsEnabled ? `ghost-${item.i}` : item.i" :key="item.i"></component>
        </transition>
      </template>
    </dashboard-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DashboardLayout from './Layout'

import Budget from './Budget/Budget'
import GhostBudget from './Budget/GhostBudget'

import Balance from './Balance/Balance'
import GhostBalance from './Balance/GhostBalance'

import Calendar from './Calendar'

import Wallet from './Wallet/Wallet'
import GhostWallet from './Wallet/GhostWallet'

import Transactions from './Transactions'
import Goal from './Goal'

import Monthly from './MonthlyReport/MonthlyReport'
import GhostMonthly from './MonthlyReport/GhostMonthlyReport'

import History from './History'

import Available from './Available/Available'
import GhostAvailable from './Available/GhostAvailable'

import Expenses from './ExpensesChart'

export default {
  computed: {
    ...mapGetters([
      'ghostModeIsEnabled',
      'dashboard',
      'user'
    ]),
    balance () {
      if (this.ghostModeIsEnabled) {
        return 'ghost-balance'
      } else return 'balance'
    }
  },
  components: {
    Transactions,
    DashboardLayout,
    Balance,
    GhostBalance,
    Calendar,
    Budget,
    GhostBudget,
    Wallet,
    GhostWallet,
    Goal,
    Monthly,
    GhostMonthly,
    History,
    Available,
    GhostAvailable,
    Expenses
  }
}
</script>

<style lang='scss'>
.dashboard {
  width: 100%;
  max-width: 120rem;
  &__section {
      background: var(--surfaceColor);
      border-radius: .5rem;
      width: 100%;
      height: 100%;
      padding: 1rem 3rem;
    &__title {
      height: 3rem !important;
      // background: red;
      display: flex;
      align-items: center;
      color: var(--textColor--dark);
      margin-bottom: 1rem;
    }
  }
}
 .vue-grid-item.vue-grid-placeholder {
   background: green !important;
 }
</style>
