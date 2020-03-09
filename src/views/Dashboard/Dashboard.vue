<template>
  <div class="dashboard">
    <div class="row row--1">
      <div class="dashboard__balance">
        <h2 class="color-grey-main">Balance</h2>
        <div class="dashboard__balance__value">
          <strong>${{balance | amount}}</strong>
        </div>
      </div>
      <div class="dashboard__monthResume">
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
      </div>
    </div>
    <div class="row row--2">
      <h2 class="color-grey-main">Wallet</h2>
      <ul class="dashboard__cardsList">
        <app-card v-for="(card,index) in cards" :key="index" :card="card"></app-card>
      </ul>
    </div>
    <div class="row row--3">
      <h2 class="color-grey-main">Budget</h2>
      <app-budget></app-budget>
    </div>
    <div class="row row--4">
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
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Transaction from '@/components/Transaction.vue'
import Budget from './Budget.vue'

export default {
  data () {
    return {
      balance: 12500,
      cashFlow: {
        income: 1400,
        expenses: 1200
      },
      cards: [
        {
          type: 'Visa',
          amount: 2000,
          supplier: 'Desjardins',
          _id: 1234
        },
        {
          type: 'Debit',
          amount: 3000,
          supplier: 'Desjardins',
          _id: 5678
        },
        {
          type: 'Cash',
          amount: 2000,
          supplier: 'Wallet'
        }
      ],
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
    appCard: Card,
    appTransaction: Transaction,
    appBudget: Budget
  }
}
</script>

<style lang='scss' scoped>
.dashboard {
  // width: 70vw;
  // max-width: 130rem;
  grid-column: 2 / 3;
  & h1,
  & h2,
  & h3 {
    margin-bottom: 1rem;
  }
  &__balance {
    width: 100%;
    &__value {
      font-size: 3rem;
      color: $color-primary;
    }
  }
  &__monthResume {
    width: 38%;
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
  &__cardsList {
    display: grid;
    grid-template-columns: repeat(auto-fit, 25rem);
    grid-template-rows: 12rem;
    grid-auto-rows: 12rem;
    column-gap: 1rem;
    row-gap: 1rem;
    align-items: center;
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
.row {
  margin-bottom: 3rem;
  &--1 {
    display: flex;
    justify-content: space-between;
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
