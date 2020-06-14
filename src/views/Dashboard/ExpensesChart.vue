<template>
    <div class="chart dashboard__section">
        <h2 class="dashboard__section__title">Planned expenditures</h2>
        <div class="chart__expenses">
          <div class="chart__expenses__container">
              <doughnut-chart :styles="chartStyles" :datacollection="data"></doughnut-chart>
          </div>
        </div>
    </div>
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
      'user',
      'expensesList'
    ])
  },
  created () {
    const labels = []
    const data = []
    const bg = []
    this.user.expenses.forEach(expense => {
      if (!expense.walletType) {
        labels.push(expense.category)
        data.push(expense.amount)
        bg.push(this.expensesList[expense.category].color)
      }
    })
    this.data = {
      labels: labels,
      datasets: [{ data: data, backgroundColor: bg }]
    }
  },
  components: {
    DoughnutChart
  }
}
</script>

<style lang="scss" scoped>
.chart {
    display: flex;
    flex-direction: column;
    &__expenses {
      display: flex;
      align-items: center;
      flex: 1;
      &__container {
          position: relative;
          width: 100%;
          height: 13rem;
          flex: 1;
        }
    }
}
</style>
