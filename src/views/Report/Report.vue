<template>
    <div class="report" :class="{isLight: theme.isLight, isDark: theme.isDark}">
      <report-header
          v-if="currentPeriod !== ''"
          @changePeriod="setData"
          :currentPeriod="currentPeriod"
          :currentReport="currentReport"
          :periodLists="periodLists">
      </report-header>
      <div class="report__item" v-if="currentReport.budget">
            <div class="report__item__title">
                <h1>Incomes</h1>
            </div>
            <table class="report__item__table">
                <thead>
                  <tr>
                    <th class="report__item__table__date">Name</th>
                    <th class="report__item__table__name">Date</th>
                    <th class="report__item__table__wallet">Counterparty</th>
                    <th class="report__item__table__amount">Details</th>
                    <th class="report__item__table__status">Amount</th>
                  </tr>
                </thead>
            </table>
            <div class="scroll">
              <table class="report__item__table">
                <tbody>
                  <tr class="report__item__table__item">
                    <td rowspan="2">Salary</td>
                    <td>25/09/2020</td>
                    <td>Wiidii</td>
                    <td>RAS</td>
                    <td>$1200</td>
                  </tr>
                  <tr class="report__item__table__item">
                    <td>14/10/2020</td>
                    <td>Wiidii</td>
                    <td>RAS</td>
                    <td>$1240</td>
                  </tr>
                </tbody>
              </table>
            </div>
      </div>
      <div class="report__item" v-if="currentReport.budget">
            <div class="report__item__title">
                <h1>Expenses</h1>
            </div>
            <table class="report__item__table">
                <thead>
                  <tr>
                    <th class="report__item__table__date">Name</th>
                    <th class="report__item__table__name">Date</th>
                    <th class="report__item__table__wallet">Counterparty</th>
                    <th class="report__item__table__amount">Details</th>
                    <th class="report__item__table__status">Amount</th>
                  </tr>
                </thead>
            </table>
            <div class="scroll">

              <table class="report__item__table" v-for="expense in userExpenses" :key="expense._id">
                <tbody>
                  <tr>
                    <td :rowspan="expense.transactions.length + 1">{{ expense.name }}</td>
                    <template v-if="expense.transactions.length > 0">
                      <td>{{ expense.transactions[0].date | short-date }}</td>
                      <td>{{ expense.transactions[0].counterparty}}</td>
                      <td>{{ expense.transactions[0].details}}</td>
                      <td>${{ expense.transactions[0].amount | amount}}</td>
                    </template>
                  </tr>
                  <tr v-for="(transaction, index) in expense.transactions" :key="transaction._id">
                      <template v-if="index !== 0">
                        <td>{{ transaction.date | short-date }}</td>
                        <td>{{ transaction.counterparty}}</td>
                        <td>{{ transaction.details}}</td>
                        <td>${{ transaction.amount | amount}}</td>
                      </template>
                  </tr>
                  <!-- <tr class="report__item__table__item">
                    <td rowspan="2">Salary</td>
                    <td>25/09/2020</td>
                    <td>Wiidii</td>
                    <td>RAS</td>
                    <td>$1200</td>
                  </tr> -->
                </tbody>
              </table>

            </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ReportHeader from './ReportHeader'
export default {
  data () {
    return {
      currentPeriod: '',
      currentReport: {},
      userIncomes: [],
      userExpenses: [],
      periodLists: []
    }
  },
  mounted () {
    window.scroll(0, 0)
    const d = new Date()
    this.currentPeriod = `${d.getMonth() + 1}-${d.getFullYear()}`
  },
  computed: {
    ...mapGetters([
      'user',
      'usersIncomesAndExpenses',
      'theme'
    ])
  },
  watch: {
    currentReport: function (report) {
      this.userIncomes = report.budget.filter(i => i.type === 'income')
      this.userExpenses = report.budget.filter(i => i.type === 'expense')
      console.log('expense', this.userExpenses)
    },
    currentPeriod: function (period) {
      this.setData(period)
    },
    'user.monthlyReports': function (reports) {
      this.setData(this.currentPeriod, reports)
    }
  },
  methods: {
    setData (period, reports) {
      const userReports = reports || this.user.monthlyReports
      const currentPeriod = period || this.currentPeriod
      const currentReport = userReports.filter(report => report.period === currentPeriod)[0]
      currentReport.budget.forEach((budget, index) => {
        for (const name in this.usersIncomesAndExpenses) {
          if (this.usersIncomesAndExpenses[name]._id === budget._id) {
            currentReport.budget[index].name = name
            currentReport.budget[index].transactions = []
            currentReport.budget[index].type = this.usersIncomesAndExpenses[name].transactionType
            currentReport.budget[index].color = this.usersIncomesAndExpenses[name].color
          }
        }
        currentReport.transactions.forEach(transaction => {
          if (transaction.budgetId === budget._id) {
            currentReport.budget[index].transactions.push(transaction)
          }
        })
      })
      this.currentReport = currentReport

      console.log('current report', this.currentReport)

      const list = []
      userReports.forEach(report => {
        list.push(report.period)
      })
      this.periodLists = list
    }
  },
  components: {
    ReportHeader
  }

}
</script>

<style lang="scss" scoped>
.scroll {
  // max-height: 18.1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
}
.report {
  width: calc(100% - 2rem);
  max-width: 120rem;
  background: var(--surfaceColor);
  border-radius: .5rem;
  margin-bottom: 5rem;
  padding: 3rem;
  &__item {
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    background: var(--backgroundColor);
    &__title {
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        & h1 {
          width: 13rem;
          color: var(--textColor--dark)
        }
    }
    &__table {
      width: 100%;
      font-size: $font-s;
      // &__item {
      //     display: flex;
      // }
      & tr {
        padding-left: 2rem;
      }
      & td, & th {
        width: 20%;
        text-align: start;
        padding: 2rem 0;
      }
      & th {
        // background: red;
        color: var(--textColor--dark)
      }
      & td {
        // background: blue;
      }
    }
  }
}

table, th, td {
  border: 1px solid red;
  border-collapse: collapse;
}
</style>
