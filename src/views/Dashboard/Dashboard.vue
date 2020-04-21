<template>
  <div class="dashboard">
    <dashboard-layout>
      <template #dashboard-balance>
        <dashboard-balance></dashboard-balance>
      </template>
      <template #dashboard-wallet>
        <dashboard-wallet></dashboard-wallet>
      </template>
      <template #dashboard-budget>
        <dashboard-budget></dashboard-budget>
      </template>
      <template #dashboard-transactions>
        <dashboard-transactions></dashboard-transactions>
      </template>
      <template #dashboard-goal>
        <dashboard-goal></dashboard-goal>
      </template>
      <template #dashboard-monthly-report>
        <dashboard-monthly-report></dashboard-monthly-report>
      </template>
      <template #dashboard-transactions-chart>
        <dashboard-transactions-chart></dashboard-transactions-chart>
      </template>
      <template #dashboard-available-instantly>
        <dashboard-available-instantly></dashboard-available-instantly>
      </template>
      <template #dashboard-expenses-chart>
        <dashboard-expenses-chart></dashboard-expenses-chart>
      </template>
    </dashboard-layout>
  </div>
</template>

<script>
import Layout from './Layout'
import Budget from './Budget'
import Balance from './Balance'
import Wallet from './Wallet'
import Transactions from './Transactions'
import Goal from './Goal'
import MonthlyReport from './MonthlyReport'
import TransactionsChart from './TransactionsChart'
import AvailableInstantly from './AvailableInstantly'
import ExpensesChart from './ExpensesChart'

export default {
  components: {
    dashboardTransactions: Transactions,
    dashboardLayout: Layout,
    dashboardBalance: Balance,
    dashboardBudget: Budget,
    dashboardWallet: Wallet,
    dashboardGoal: Goal,
    dashboardMonthlyReport: MonthlyReport,
    dashboardTransactionsChart: TransactionsChart,
    dashboardAvailableInstantly: AvailableInstantly,
    dashboardExpensesChart: ExpensesChart
  }
}
</script>

<style lang='scss'>
.dashboard {
  max-width: 120rem;
  grid-column: 2 / 3;

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
