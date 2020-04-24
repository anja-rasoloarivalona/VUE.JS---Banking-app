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
      'usersIncomesAndExpenses',
      'secondaryColors'
    ])
  },
  created () {
    const labels = []
    const data = []
    const bg = []
    for (const key in this.usersIncomesAndExpenses) {
      if (this.usersIncomesAndExpenses[key].transactionType === 'expense' && this.usersIncomesAndExpenses[key].walletType === undefined) {
        labels.push(key)
        data.push(this.usersIncomesAndExpenses[key].amount)
        bg.push(this.usersIncomesAndExpenses[key].color)
      }
    }
    const datasets = {
      data: data,
      // backgroundColor: ['#B34912', '#FF600D', '#B39612', '#FFD40D']
      // backgroundColor: ['#059782', '#99a1d7', '#2bac49', '#3144af', '#59bcd8']
      backgroundColor: this.secondaryColors
    }

    const datacollection = {
      datasets: [
        datasets
      ],
      labels: labels
    }
    this.data = datacollection
  },
  components: {
    DoughnutChart
  }
}
</script>

<style lang="scss" scoped>
.chart {
    padding: 1rem;
    padding-left: 3rem;
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
        }
    }
}
</style>
