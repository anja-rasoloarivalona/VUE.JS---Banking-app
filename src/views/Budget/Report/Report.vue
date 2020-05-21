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
            <div class="report__item__details">
              <div class="report__item__details__header">
                  <div>Name</div>
                  <div>Amount</div>
                  <div>Transactions</div>
              </div>
              <ul class="report__item__details__list">
                  <div
                    class="report__item__details__list__item"
                    v-for="(income, index) in userIncomes"
                    :key="income.name"
                    :class="{
                      'bg-on-surfaceColor': theme.isDark && index % 2 === 0,
                      'bg-surfaceColor': theme.isDark && index % 2 !== 0,
                      'bg-mainColor--light': theme.isLight && index % 2 === 0
                    }">
                    <div>{{ income.name}}</div>
                    <div>${{ income.amount | amount}}</div>
                    <div>{{ income.transactions.length}}</div>
                  </div>
              </ul>
            </div>
      </div>
      <div class="report__item" v-if="currentReport.budget">
            <div class="report__item__title">
                <h1>Expenses</h1>
            </div>
            <div class="report__item__details">
              <div class="report__item__details__header">
                  <div>Name</div>
                  <div>Amount</div>
                  <div>Transactions</div>
              </div>
              <ul class="report__item__details__list">
                  <div
                    class="report__item__details__list__item"
                    v-for="(expense, index) in userExpenses"
                    :key="expense.name"
                    :class="{
                      'bg-on-surfaceColor': theme.isDark && index % 2 === 0,
                      'bg-surfaceColor': theme.isDark && index % 2 !== 0,
                      'bg-mainColor--light': theme.isLight && index % 2 === 0
                    }">
                    <div>{{ expense.name}}</div>
                    <div>${{ expense.amount | amount}}</div>
                    <div>{{ expense.transactions.length}}</div>
                  </div>
              </ul>
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
.report {
  margin-bottom: 3rem;
  &__item {
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: .5rem;
    &__title {
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        & h1 {
          width: 13rem;
          color: var(--textColor--dark)
        }
    }
    &__details {
        &__header {
          background: var(--backgroundColor);
          padding: 2rem 0;
          display: flex;
          font-size: $font-m;
          padding-left: 2rem;
          border-top-left-radius: .5rem;
          border-top-right-radius: .5rem;
          & div {
              width: calc(100% / 3);
              color: var(--textColor--dark)
          }
        }
        &__list {
          list-style: none;
          font-size: $font-m;
          &__item {
            padding: 2rem 0;
            padding-left: 2rem;
            display: flex;
              & div {
                width: calc(100% / 3);
              }
          }
      }
    }
  }
  &.isLight {
    & .report__item {
      &__details {
        &__header {
          background: var(--mainColor);
          & div {
            color: $color-white
          }
        }
      }
    }
  }
  &.isDark {
    & .report__item {
      border: 1px solid var(--lineColor);
    }
  }
}
</style>
