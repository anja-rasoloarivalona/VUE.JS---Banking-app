<template>
    <div class="report">
      <report-header @changePeriod="setPeriod"></report-header>
      <div class="report__item" v-if="currentReport.budget">
            <div class="report__item__title">
                <h2>Incomes</h2>
            </div>
            <div class="report__item__details">
              <div class="report__item__details__header">
                  <div>Name</div>
                  <div>Amount</div>
                  <div>Transactions</div>
              </div>
              <ul class="report__item__details__list">
                  <div class="report__item__details__list__item" v-for="(income, index) in userIncomes" :key="income.name" :class="{'bg-on-surfaceColor': index % 2 === 0, 'bg-surfaceColor': index % 2 !== 0 }">
                    <div>{{ income.name}}</div>
                    <div>${{ income.amount | amount}}</div>
                    <div>{{ income.transactions.length}}</div>
                  </div>
              </ul>
            </div>
      </div>
      <div class="report__item" v-if="currentReport.budget">
            <div class="report__item__title">
                <h2>Expenses</h2>
            </div>
            <div class="report__item__details">
              <div class="report__item__details__header">
                  <div>Name</div>
                  <div>Amount</div>
                  <div>Transactions</div>
              </div>
              <ul class="report__item__details__list">
                  <div class="report__item__details__list__item" v-for="(expense, index) in userExpenses" :key="expense.name" :class="{'bg-on-surfaceColor': index % 2 === 0, 'bg-surfaceColor': index % 2 !== 0 }">
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
      period: '',
      currentReport: {},
      userIncomes: [],
      userExpenses: []
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'usersIncomesAndExpenses'
    ])
  },
  watch: {
    currentReport: function (report) {
      this.userIncomes = report.budget.filter(i => i.type === 'income')
      this.userExpenses = report.budget.filter(i => i.type === 'expense')
      // console.log('current report change', report)
    }
  },
  methods: {
    setPeriod: async function (val) {
      this.period = val
      const report = this.user.monthlyReports.filter(report => report.period === val)[0]
      report.budget.forEach((budget, index) => {
        for (const key in this.usersIncomesAndExpenses) {
          if (this.usersIncomesAndExpenses[key]._id === budget._id) {
            report.budget[index].name = this.usersIncomesAndExpenses[key].name
            report.budget[index].transactions = []
            report.budget[index].type = this.usersIncomesAndExpenses[key].transactionType
            report.budget[index].color = this.usersIncomesAndExpenses[key].color
          }
        }
        report.transactions.forEach(transaction => {
          if (transaction.budgetId === budget._id) {
            report.budget[index].transactions.push(transaction)
          }
        })
      })
      this.currentReport = report
    },
        scrollToTop () {
      window.scrollTo(0, 0)
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
    border: 1px solid var(--lineColor);
    margin-bottom: 2rem;
    border-radius: .5rem;
    &__title {
            text-transform: uppercase;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            & h2 {
                // background: red;
                width: 13rem
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
                    // color: var(--textColor--dark)
                  }
                }
            }
      }
  }
}
</style>
