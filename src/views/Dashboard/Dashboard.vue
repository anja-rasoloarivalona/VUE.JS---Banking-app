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
    </dashboard-layout>
       <!-- <div class="dashboard__monthResume">
        <h2 class="color-primary">Monthly summary</h2>
        <div class="dashboard__monthResume__data">
          <div class="dashboard__monthResume__data__group">
            <h3 class="dashboard__monthResume__data__group__key">Income</h3>
            <div
              class="dashboard__monthResume__data__group__value dashboard__monthResume__data__group__value--income"
            >+${{cashFlow.income | amount }}</div>
          </div>
          <div class="dashboard__monthResume__data__group">
            <h3 class="dashboard__monthResume__data__group__key">Expenses</h3>
            <div
              class="dashboard__monthResume__data__group__value dashboard__monthResume__data__group__value--expense"
            >-${{cashFlow.expenses | amount }}</div>
          </div>
        </div>
      </div> -->
  </div>
</template>

<script>
import Layout from './Layout'
import Budget from './Budget'
import Balance from './Balance'
import Wallet from './Wallet'
import Transactions from './Transactions'
import Goal from './Goal'

export default {
  data () {
    return {
      cashFlow: {
        income: 1400,
        expenses: 1200
      }
    }
  },
  components: {
    dashboardTransactions: Transactions,
    dashboardLayout: Layout,
    dashboardBalance: Balance,
    dashboardBudget: Budget,
    dashboardWallet: Wallet,
    dashboardGoal: Goal
  }
}
</script>

<style lang='scss'>
.dashboard {
  width: 70vw;
  max-width: 130rem;
  grid-column: 2 / 3;

  &__section {
    &__title {
      height: 3rem;
      display: flex;
      align-items: center;
      color: $color-grey--main;
    }
  }

  &__monthResume {
    background: $color-white;
    padding: 1.5rem;
    border-radius: 1.5rem;
    &__data {
      display: flex;
      justify-content: space-between;
      &__group {
        width: 100%;
        display: flex;
        flex-direction: column;
        &:last-child {
          align-items: flex-end;
        }
        &__key {
          color: $color-grey--main;
        }
        &__value {
          font-size: 1.6rem;
          font-weight: bold;
          &--income {
            color: green;
          }
          &--expense {
            color: red;
          }
        }
      }
    }
  }
}
</style>
