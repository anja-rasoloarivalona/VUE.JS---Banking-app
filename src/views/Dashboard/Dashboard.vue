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
      <!-- <div class="dashboard__transactions">
        <h2 class="color-grey-main">Recent transactions</h2>
          <div class="dashboard__transactions">
            <header class="dashboard__transactions__header">
                Date
            </header>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Counterparty</th>
                  <th>Details</th>
                  <th>Used wallet</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <app-transaction
                  v-for="transaction in transactions"
                  :key="transaction.shortId"
                  :transaction="transaction"
                ></app-transaction>
              </tbody>
            </table>
        </div>
      </div> -->

  </div>
</template>

<script>
// import Transaction from '@/components/UI/Transaction'

import Layout from './Layout'
import Budget from './Budget'
import Balance from './Balance'
import Wallet from './Wallet'

export default {
  data () {
    return {
      cashFlow: {
        income: 1400,
        expenses: 1200
      },
      transactions: [
        {
          shortId: 123,
          date: '2 Nov 2019',
          counterparty: 'Pierre',
          details: 'November rent',
          usedWallet: 'Debit Desjardins',
          amount: 300,
          status: 'paid'
        },
        {
          shortId: 423,
          date: '2 Nov 2019',
          counterparty: 'Pierre',
          details: 'November rent',
          usedWallet: 'Debit Desjardins',
          amount: 300,
          status: 'paid'
        }
      ]
    }
  },
  components: {
    // appTransaction: Transaction,
    dashboardLayout: Layout,
    dashboardBalance: Balance,
    dashboardBudget: Budget,
    dashboardWallet: Wallet
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
  &__transactions {
    background: $color-white;
    border-radius: 3rem;
    padding: 1rem;
    padding-bottom: 3rem;
    &__header {
      padding: 2rem 0;
    }
  }
}

table,
table th, td {
  border-top: 1px solid $color-line;
  border-bottom: 1px solid $color-line;
  border-collapse: collapse;
}
table {
  width: 100%;
  & th, & td {
    padding: 1.5rem;
  }
  & th {
    text-align: start;
    background: $color-grey--light;
    font-size: $font-s;
  }
}
</style>
