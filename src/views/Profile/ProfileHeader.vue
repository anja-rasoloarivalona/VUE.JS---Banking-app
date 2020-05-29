<template>
  <header class="header">
    <div class="header__details">
      <h1>Monthly average</h1>
      <div class="header__details__item">
        <div class="header__details__item__key">
          Incomes
        </div>
        <div class="header__details__item__value">
          $ {{userBudgetPlan.monthlyIncomes | amount}}
        </div>
      </div>
      <div class="header__details__item">
        <div class="header__details__item__key">
          Fixed Expenses
        </div>
        <div class="header__details__item__value">
          $ {{userBudgetPlan.monthlyFixedExpenses | amount }}
        </div>
      </div>
      <div class="header__details__item">
        <div class="header__details__item__key">
          Variable Expenses
        </div>
        <div class="header__details__item__value">
          $ {{userBudgetPlan.monthlyVariableExpenses | amount }}
        </div>
      </div>
      <div class="header__details__item">
        <div class="header__details__item__key">
          Savings
        </div>
        <div class="header__details__item__value">
          $ {{ userBudgetPlan.monthlySavings | amount }}
        </div>
      </div>
    </div>
    <div class="header__chart">
      <doughnut-chart :styles="chartStyles" :datacollection="data"></doughnut-chart>
    </div>
  </header>
</template>

<script>
import DoughnutChart from '@/components/Charts/Doughnut'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: null,
      chartStyles: {
        height: '130px',
        width: '100%',
        position: 'relative'
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created () {
    const labels = []
    const data = []
    const bg = []
    this.user.expenses.forEach(expense => {
      labels.push(expense.name)
      data.push(expense.amount)
      bg.push(expense.color)
    })
    this.data = {
      labels: labels,
      datasets: [{ data: data, backgroundColor: bg }]
    }
  },
  components: {
    DoughnutChart
  },
  props: {
    userBudgetPlan: Object
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  padding-left: 2rem;
  &__details {
    width: 65%;
    & h1 {
      margin-bottom: 2rem;
      color: var(--textColor--dark)
    }
    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 30rem;
      font-size: $font-m;
      margin-bottom: 2rem;
      &__key {
        height: 100%;
        width: 15rem;
        color: var(--textColor--dark);
      }
    }
  }
  &__chart {
    width: 35%;
    height: 13rem;
    flex: 1;
    position: relative;
  }
}
</style>
