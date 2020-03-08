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
        <h2 class="color-primary">This month</h2>
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
            >+${{cashFlow.expenses | amount }}</div>
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
      <h2 class="color-grey-main">Recent transactions</h2>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
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
      ]
    }
  },
  components: {
    appCard: Card
  }
}
</script>

<style lang='scss' scoped>
.dashboard {
  width: 70vw;
  max-width: 130rem;
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
    background: $color-grey--light;
    padding: 1.7rem 2rem;
    width: 38%;
    border-radius: 1rem;
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
}
.row {
 margin-bottom: 3rem;
 &--1 {
  display: flex;
  justify-content: space-between;
 }
}

</style>
