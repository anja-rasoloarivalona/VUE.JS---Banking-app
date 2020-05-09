<template>
  <header class="header">
    <div class="header__details">
      <h1>Monthly average</h1>
      <div class="header__details__item">
        <div class="header__details__item__key">
          Incomes
        </div>
        <div class="header__details__item__value">
          $ {{monthlyIncomes | amount}}
        </div>
      </div>
      <div class="header__details__item">
        <div class="header__details__item__key">
          Expenses
        </div>
        <div class="header__details__item__value">
          $ {{monthlyExpenses | amount }}
        </div>
      </div>
      <div class="header__details__item">
        <div class="header__details__item__key">
          Savings
        </div>
        <div class="header__details__item__value">
          $ {{ savings | amount }}
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
      monthlyIncomes: 0,
      monthlyExpenses: 0,
      chartStyles: {
        height: '130px',
        width: '100%',
        position: 'relative'
      },
      counter: {
        once: 1,
        twice: 2,
        'three times': 3,
        'four times': 4,
        'five times': 5
      },
      period: {
        'a day': 30,
        'a week': 4,
        'every two weeks': 2,
        'a month': 1,
        'a year': 1 / 12
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    savings () {
      return this.monthlyIncomes - this.monthlyExpenses
    }
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
  mounted () {
    this.user.incomes.forEach(income => {
      this.monthlyIncomes += income.amount * this.period[income.frequency.period] * this.counter[income.frequency.counter]
    })
    this.user.expenses.forEach(expense => {
      this.monthlyExpenses += expense.amount * this.period[expense.frequency.period] * this.counter[expense.frequency.counter]
    })
  },
  components: {
    DoughnutChart
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
    }
    &__item {
      display: flex;
      align-items: center;
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
