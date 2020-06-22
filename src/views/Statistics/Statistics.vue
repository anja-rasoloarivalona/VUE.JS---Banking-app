<template>
    <div class="statistics" :class="{isLight: theme.isLight, isDark: theme.isDark}">
      <div class="statistics__content">
          <statistics-header
              v-if="currentPeriod !== ''"
              :currentPeriod="currentPeriod"
              :periodLists="periodLists"
              :data="reportHeaderData"
              @changePeriod="currentPeriod = $event"
          />
          <statistics-table
            :currentReport="currentReport"
            :totalIncome="totalIncome"
            :totalExpense="totalExpense"
          />
          <statistics-budget />

    </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StatisticsHeader from './StatisticsHeader'
import StatisticsTable from './StatisticsTable'
import StatisticsBudget from './StatisticsBudget'
export default {
  data () {
    return {
      currentPeriod: {},
      userIncomes: [],
      userExpenses: []
    }
  },
  beforeMount () {
    window.scroll(0, 0)
    const d = new Date()
    const value = `${d.getMonth() + 1}-${d.getFullYear()}`
    const month = d.getMonth() + 1 < 10 ? `month0${d.getMonth() + 1}--full` : `month${d.getMonth() + 1}--full`
    const year = d.getFullYear()
    this.currentPeriod = {
      value: value,
      i18: month,
      custom: year
    }
  },
  watch: {
    'currentPeriod.value': function (val) {
      console.log('oeriod changed', val)
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'expensesList',
      'incomesList',
      'theme'
    ]),
    periodLists () {
      const periods = []
      this.user.monthlyReports.forEach(report => {
        const month = parseInt(report.period.split('-')[0]) < 10 ? `month0${report.period.split('-')[0]}` : `month${report.period.split('-')[0]}`
        const year = report.period.split('-')[1]

        if (!periods.includes(report.period)) {
          periods.push({
            value: report.period,
            i18: `${month}--full`,
            custom: year
          })
        }
      })
      // console.log('periodsList', periods)
      return periods
    },
    reportHeaderData () {
      return {
        totalExpense: this.totalExpense,
        totalIncome: this.totalIncome,
        expenseData: this.currentReport.expenseData
      }
    },
    totalIncome () {
      let income = 0
      this.currentReport.incomeData.forEach(i => {
        income += i.amount
      })
      return income
    },
    totalExpense () {
      let totalExpense = 0
      for (const expense in this.currentReport.expenseData) {
        totalExpense += this.currentReport.expenseData[expense].total
      }
      return totalExpense
    },
    currentReport () {
      let currentReport = {}
      const currentReportIncome = []
      const currentReportExpense = {}
      this.user.monthlyReports.find((report, index) => {
        if (report.period === this.currentPeriod.value) {
          currentReport = this.user.monthlyReports[index]
          return true
        }
      })
      currentReport.details && currentReport.details.forEach((detail, index) => {
        if (detail.category in this.expensesList) {
          const expenseAmount = detail.used ? detail.used : detail.amount
          currentReport.details[index].type = 'expense'
          if (!(detail.category in currentReportExpense)) {
            currentReportExpense[detail.category] = {
              total: expenseAmount,
              subcategories: {
                [detail.subcategory]: expenseAmount
              }
            }
          } else {
            currentReportExpense[detail.category].total += expenseAmount
            if (!(detail.subcategory in currentReportExpense[detail.category].subcategories)) {
              currentReportExpense[detail.category].subcategories[detail.subcategory] = expenseAmount
            } else {
              currentReportExpense[detail.category].subcategories[detail.subcategory] += expenseAmount
            }
          }
        } else {
          currentReport.details[index].type = 'income'
          currentReportIncome.push(detail)
        }
      })
      return {
        data: currentReport,
        incomeData: currentReportIncome,
        expenseData: currentReportExpense
      }
    }
  },
  components: {
    StatisticsHeader,
    StatisticsTable,
    StatisticsBudget
  }

}
</script>

<style lang="scss">
.statistics {
  width: calc(100% - 2rem);
  max-width: 120rem;
  background: var(--surfaceColor);
  height: min-content;
  border-radius: .5rem;
  height: 100%;
  padding: 3rem;
  position: relative;
  &__content {
    //  position: absolute;
      // top: 0;
      // bottom: 0;
      // left: 0;
      // right: 0;
      margin: auto;
      // background: red;
      width: 95%;
      height: 100%;
      display: flex;
      flex-direction: column;
      &__table {
         display: flex;
        flex-direction: column;
        flex-grow: 1;
        &__type {
          border-right: 1px solid var(--lineColor);
          border-bottom: 1px solid var(--lineColor);
           div {
              text-align: center;
          }
        }
        &__nested-table {
              width: 200% !important;
              border-collapse: unset;
        }
        &__income__value {
            border-bottom: 1px solid var(--lineColor);
        }
        &__scroll {
          flex-grow: 1;
          overflow: auto;
          max-height: 60vh;
            &::-webkit-scrollbar{
              display: none;
            }
            & table tbody > tr {
              border-bottom: 1px solid var(--lineColor);
            }
            & .notLastIncome {
              border-bottom: none !important;
            }
            & table tbody > tr > td.expense-name {
              border-right: 1px solid var(--lineColor);
            }
          }
          &__total {
            background: var(--backgroundColor);
            &--savings {
              background: var(--mainColor--light);
            }
            & td {
              width: calc(100% / 5);
            }
          }
      }
  }
  & table {
    width: 100%;
    border-collapse: collapse;
        & th {
            height: 6rem;
            width: calc(100% / 5);
            text-align: start;
            border-bottom: 1px solid var(--lineColor);
            font-size: $font-s;
            background: var(--backgroundColor);
            color: var(--textColor--dark);
             border-collapse: collapse;
             padding-left: 1rem;
                &:first-child {
                    border-radius: 6px 0 0 0;
                }
                &:last-child {
                    border-radius: 0 6px 0 0;
                }
                &:only-child {
                    border-radius: 6px 6px 0 0;
                }
        }
        & td {
          padding-left: 1rem;
          height: 6rem;
          width: calc(100% / 5);
          font-size: $font-s;
           border-collapse: collapse;
        }
    }

}

table, th, td {
  // border: 1px solid red;
  border-collapse: collapse;
}

</style>
