<template>
    <div class="chart dashboard__section">
        <h2 class="dashboard__section__title">History</h2>
        <div class="chart__container">
            <line-chart :data="datacollection" :styles="myStyles" :gradient1="chartColor" :gradient2="'transparent'" ></line-chart>
        </div>
    </div>
</template>

<script>
import theme from '@/assets/theme'
import Months from '@/utilities/months'
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
      },
      theme: theme
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
    let currentMonth = null
    data.forEach(label => {
      balanceData.push(label.balance)
      if (!currentMonth) {
        currentMonth = Months[parseInt(label.shortDate.split('/')[0]) - 1]
        this.datacollection.labels.push(`${currentMonth} ${label.shortDate.split('/')[1]}`)
      } else {
        if (currentMonth === Months[parseInt(label.shortDate.split('/')[0]) - 1]) {
          this.datacollection.labels.push(`${label.shortDate.split('/')[1]}`)
        } else {
          currentMonth = Months[parseInt(label.shortDate.split('/')[0]) - 1]
          this.datacollection.labels.push(`${currentMonth} ${label.shortDate.split('/')[1]}`)
        }
      }
    })
    this.datacollection.datasets = [{
      label: 'Balance',
      data: balanceData
    }]
  },
  computed: {
    ...mapGetters([
      'userTransactions',
      'userBalance',
      'currentTheme'
    ]),
    chartColor () {
      return theme[this.currentTheme]['--mainColor']
    }
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
