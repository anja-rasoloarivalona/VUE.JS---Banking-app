<template>
    <div class="chart dashboard__section">
        <h2 class="dashboard__section__title">History</h2>
        <div class="chart__container">
            <line-chart :data="datacollection" :styles="myStyles" :gradient1="'green'" :gradient2="'transparent'" ></line-chart>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '@/components/Charts/Line'
export default {
  data () {
    return {
      datacollection: {
        labels: [],
        datasets: []
      },
      myStyles: {
        height: '170px',
        width: '100%',
        position: 'relative'
      }
    }
  },
  created () {
    const today = new Date()
    const data = []
    for (let i = 31; i >= 0; i--) {
      const fullDate = new Date(new Date().setDate(today.getDate() - i))
      let month = fullDate.getMonth() + 1
      if (month < 10) {
        month = `0${month}`
      }
      const labelData = {
        fullDate: fullDate,
        shortDate: `${month}/${fullDate.getDate()}`,
        transactions: [],
        balanceVariation: 0,
        balance: 0
      }
      data.push(labelData)
    }

    this.userTransactions.forEach(transaction => {
      const fullDate = new Date(transaction.date)
      let month = fullDate.getMonth() + 1
      if (month < 10) {
        month = `0${month}`
      }
      const shortDate = `${month}/${fullDate.getDate()}`
      data.forEach(label => {
        if (label.shortDate === shortDate) {
          label.balanceVariation += transaction.amount
          label.transactions.push(transaction)
        }
      })
    })

    data.reverse()
    let balance = this.userBalance
    data.forEach((label, index) => {
      label.balance = balance
      balance -= label.balanceVariation
    })
    data.reverse()

    const balanceData = []
    data.forEach(label => {
      balanceData.push(label.balance)
      this.datacollection.labels.push(label.shortDate)
    })
    this.datacollection.datasets = [{
      label: 'Balance',
      data: balanceData
    }]
  },
  computed: {
    ...mapGetters([
      'userTransactions',
      'userBalance'
    ])
  },
  components: {
    LineChart
  }
}
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
    padding: 1rem;
    padding-left: 3rem;

    &__container {
        position: relative;
        width: 100%;
        height: 17rem;
    }
}
</style>
