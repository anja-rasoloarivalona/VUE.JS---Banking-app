<template>
    <div class="chart dashboard__section">
        <h2 class="dashboard__section__title">{{$t('history')}}</h2>
        <div class="chart__container">
            <line-chart
              :data="datacollection"
              :maxBalance="userMaxBalance"
            />
        </div>
    </div>
</template>

<script>
import themes from '@/assets/theme'
import Months from '@/utilities/months'
import { mapGetters } from 'vuex'
import LineChart from '@/components/Charts/Line/Line'
export default {
  data () {
    return {
      datacollection: {
        labels: [],
        datasets: []
      },
      myStyles: {
        height: '170px',
        width: '80vw',
        position: 'relative'
      },
      userMaxBalance: 0
    }
  },

  created () {
    this.loadData(this.userTransactions)
  },
  watch: {
    userTransactions: function (updatedTransactions) {
      this.loadData(updatedTransactions)
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'userTransactions',
      'userBalance',
      'theme'
    ]),
    chartColor () {
      return themes[this.theme.currentTheme]['--secondaryColor']
    }
  },
  methods: {
    loadData (transactions) {
      const today = new Date()
      const tomorrow = today.setDate(today.getDate() + 1)
      const data = []
      for (let i = 31; i >= 0; i--) {
      // for (let i = 31; i >= 0; i--) {
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
          incomesVariation: 0,
          expensesVariation: 0,
          balance: 0
        }
        data.push(labelData)
      }
      for (let i = 1; i <= 31; i++) {
      // for (let i = 1; i <= 31; i++) {
        const fullDate = new Date(new Date().setDate(today.getDate() + i))
        let month = fullDate.getMonth() + 1
        if (month < 10) {
          month = `0${month}`
        }
        const labelData = {
          fullDate: fullDate,
          shortDate: `${month}/${fullDate.getDate()}`,
          transactions: [],
          balanceVariation: 0,
          incomesVariation: 0,
          expensesVariation: 0,
          balance: 0
        }
        data.push(labelData)
      }

      transactions.forEach(transaction => {
        if (transaction.details !== 'Initialization') {
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
              if (transaction.transactionType === 'expense') {
                label.expensesVariation += (transaction.amount * -1)
              }
              if (transaction.transactionType === 'income') {
                label.incomesVariation += transaction.amount
              }
            }
          })
        }
      })

      const before = []
      const after = []
      data.forEach(label => {
        if (new Date(label.fullDate) < tomorrow) {
          before.push(label)
        } else {
          after.push(label)
        }
      })

      before.reverse()
      let beforeBalance = this.userBalance
      before.forEach(label => {
        if (beforeBalance > this.userMaxBalance) {
          this.userMaxBalance = beforeBalance
        }
        label.balance = beforeBalance
        beforeBalance -= label.balanceVariation
      })
      before.reverse()

      let afterBalance = this.userBalance
      after.forEach(label => {
        if (afterBalance > this.userMaxBalance) {
          this.userMaxBalance = afterBalance
        }
        label.balance = afterBalance
        afterBalance += label.balanceVariation
      })

      const fullData = [...before, ...after]

      const balanceData = []
      const expenseData = []
      const incomeData = []
      let currentMonth = null

      fullData.forEach(label => {
        balanceData.push(label.balance)
        expenseData.push(label.expensesVariation)
        incomeData.push(label.incomesVariation)
        if (this.datacollection.labels.length < fullData.length) {
          if (!currentMonth) {
            currentMonth = Months[parseInt(label.shortDate.split('/')[0]) - 1]
            this.datacollection.labels.push(`${label.shortDate.split('/')[1]}`)
          } else {
            if (currentMonth === Months[parseInt(label.shortDate.split('/')[0]) - 1]) {
              this.datacollection.labels.push(`${label.shortDate.split('/')[1]}`)
            } else {
              currentMonth = Months[parseInt(label.shortDate.split('/')[0]) - 1]
              this.datacollection.labels.push(`${currentMonth} ${label.shortDate.split('/')[1]}`)
            }
          }
        }
      })

      this.datacollection.datasets = [
        {
          borderColor: themes[this.theme.currentTheme]['--secondaryColor'],
          backgroundColor: themes[this.theme.currentTheme]['--secondaryColor--2'],
          pointBackgroundColor: themes[this.theme.currentTheme]['--secondaryColor'],
          label: 'Expense',
          data: expenseData,
          fill: true
        },
        {
          borderColor: themes[this.theme.currentTheme]['--textColor-dark'],
          backgroundColor: themes[this.theme.currentTheme]['--textColor-dark--2'],
          pointBackgroundColor: themes[this.theme.currentTheme]['--textColor-dark'],
          label: 'Income',
          data: incomeData,
          fill: true
        },
        {
          borderColor: themes[this.theme.currentTheme]['--mainColor'],
          backgroundColor: themes[this.theme.currentTheme]['--mainColor--2'],
          pointBackgroundColor: themes[this.theme.currentTheme]['--mainColor'],
          label: 'Balance',
          fill: true,
          data: balanceData
        }
      ]
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
    &__container {
        position: relative;
        width: 100%;
        // width: 10rem;
        overflow-x: auto;
        height: 17rem;
        // background: rgba(121, 121, 121, 0.329);
    }
}
</style>
