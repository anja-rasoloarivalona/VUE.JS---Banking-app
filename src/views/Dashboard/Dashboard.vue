<template>
  <div class="dashboard">
    <dashboard-layout>
      <template #balance>
        <balance></balance>
      </template>
      <template #wallet>
        <wallet></wallet>
      </template>
      <template #budget>
        <budget></budget>
      </template>
      <template #transactions>
        <transactions></transactions>
      </template>
      <template #goal>
        <goal></goal>
      </template>
      <template #monthly>
        <monthly></monthly>
      </template>
      <template #history>
        <history></history>
      </template>
      <template #available>
        <available></available>
      </template>
      <template #expenses>
        <expenses></expenses>
      </template>
    </dashboard-layout>
  </div>
</template>

<script>
import DashboardLayout from './Layout'
import Budget from './Budget'
import Balance from './Balance'
import Wallet from './Wallet'
import Transactions from './Transactions'
import Goal from './Goal'
import Monthly from './MonthlyReport'
import History from './History'
import Available from './AvailableInstantly'
import Expenses from './ExpensesChart'

export default {
  components: {
    Transactions,
    DashboardLayout,
    Balance,
    Budget,
    Wallet,
    Goal,
    Monthly,
    History,
    Available,
    Expenses
  }
}
</script>

<style lang='scss'>
.dashboard {
  width: 100%;
  max-width: 120rem;
  // grid-column: 2 / 3;
  &__section {
      background: var(--surfaceColor);
      border-radius: .5rem;
      width: 100%;
      height: 100%;
    &__title {
      height: 3rem;
      display: flex;
      align-items: center;
      color: var(--textColor--dark)
    }
  }
}
</style>
