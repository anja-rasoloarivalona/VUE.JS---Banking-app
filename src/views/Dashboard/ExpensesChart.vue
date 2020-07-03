<template>
    <div class="chart dashboard__section">
        <h2 class="dashboard__section__title">Monthly expenses</h2>
        <div class="chart__expenses">
          <div class="chart__expenses__container">
              <doughnut-chart
                v-if="currentPeriodReport && Object.keys(currentPeriodReport).length > 0 && currentPeriodReport.transactions.length > 0"
                :styles="chartStyles"
                :datacollection="chartData"
              />
              <div class="chart__expenses__empty" v-else>You do not have expenses this month</div>
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
      chartStyles: {
        height: '130px',
        width: '100%',
        position: 'relative'
      }
    }
  },
  mounted () {
    console.log(this.currentPeriodReport.length)
  },
  computed: {
    ...mapGetters([
      'user',
      'expensesList',
      'currentPeriodReport'
    ]),
    chartData () {
      let expenseChartData = {}
      const d = {}
      this.currentPeriodReport.transactions.forEach(transaction => {
        if (transaction.transactionType === 'expense') {
          if (!([transaction.subcategory] in d)) {
            d[transaction.subcategory] = {
              amount: transaction.amount * -1,
              category: transaction.category
            }
          } else {
            d[transaction.subcategory].amount += (transaction.amount * -1)
          }
        }
      })

      const labels = []
      const data = []
      const bg = []

      for (const expense in d) {
        labels.push(expense)
        data.push(d[expense].amount)
        bg.push(this.expensesList[d[expense].category].color)
      }
      expenseChartData = {
        labels: labels,
        datasets: [{ data: data, backgroundColor: bg }]
      }
      return expenseChartData
    }
  },
  created () {

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
      &__empty {
        font-size: $font-s;
      }
      &__container {
          position: relative;
          width: 100%;
          height: 13rem;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
    }
}
</style>
