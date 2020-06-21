<template>
    <div class="report" :class="{isLight: theme.isLight, isDark: theme.isDark}">
      <div class="report__content">
          <report-header
              v-if="currentPeriod !== ''"
              :currentPeriod="currentPeriod"
              :periodLists="periodLists"
              :data="reportHeaderData"
              @changePeriod="currentPeriod = $event"
          >
          </report-header>
          <div class="report__content__table">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Amount</th>
                    <th>Total</th>
                  </tr>
                </thead>
              </table>
              <div class="report__content__table__scroll">
                <table>
                  <tbody>
                    <tr v-for="(detail, index) in currentReport.incomeData" :key="detail.Category" :class="{lastIncome: index === currentReport.incomeData.length - 1, notLastIncome: index !== currentReport.incomeData.length - 1,}">
                      <template v-if="index === 0">
                        <td :rowspan="currentReport.incomeData.length" :colspan="2" class="report__content__table__type">
                            <div>{{$t('income')}}</div>
                        </td>
                        <income type="subcategory" :income="{subcategory: detail.subcategory}" />
                        <td>{{detail.amount | amount}}</td>
                        <td :rowspan="currentReport.incomeData.length" class="report__content__table__income__value">{{ totalIncome | amount }}</td>
                      </template>
                      <template v-else>
                        <income type="subcategory" :income="{subcategory: detail.subcategory}" />
                        <td>{{detail.amount | amount }}</td>
                      </template>
                    </tr>
                    <tr class="report__content__table__total">
                        <td :colspan="3">&nbsp;</td>
                        <td>Total Income</td>
                        <td>{{ totalIncome | amount }}</td>
                    </tr>

                    <tr v-for="(category, catKey, catIndex) in currentReport.expenseData" :key="catKey">
                      <template v-if="catIndex === 0">
                        <td :rowspan="Object.keys(currentReport.expenseData).length" class="report__content__table__type">
                          <div>{{$t('expense')}}</div>
                        </td>
                        <expense type="category" :categoryName="catKey"/>
                        <table v-for="(subcategory, subcatKey) in category.subcategories" :key="subcatKey" class="report__content__table__nested-table" >
                           <tr>
                            <expense type="subcategory" :categoryName="catKey" :subcategoryName="subcatKey"/>
                            <td>{{ subcategory | amount}}</td>
                          </tr>
                        </table>
                        <td>&nbsp;</td>
                        <td>{{ category.total | amount}}</td>
                      </template>

                      <template v-else>
                        <expense type="category" :categoryName="catKey"/>
                        <table v-for="(subcategory, subcatKey) in category.subcategories" :key="subcatKey" class="report__content__table__nested-table">
                          <tr>
                              <expense type="subcategory" :categoryName="catKey" :subcategoryName="subcatKey"/>
                              <td>{{ subcategory | amount}}</td>
                          </tr>
                        </table>
                        <td>&nbsp;</td>
                        <td>{{ category.total | amount}}</td>
                      </template>

                    </tr>
                     <tr class="report__content__table__total">
                        <td :colspan="3">&nbsp;</td>
                        <td>Total Expense</td>
                        <td>{{ totalExpense | amount}}</td>
                    </tr>
                    <tr class="report__content__table__total--savings">
                        <td :colspan="3">&nbsp;</td>
                        <td>Savings</td>
                        <td>{{ totalIncome - totalExpense | amount}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
                <div class="test">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nisl ante, elementum quis fermentum id, fermentum et elit. Mauris interdum, sapien eget scelerisque facilisis, nisi turpis condimentum augue, et imperdiet mauris diam quis metus. Nam vel orci libero. Curabitur placerat justo viverra consequat porttitor. Ut lobortis elit nisl, ac congue ex auctor sed. Fusce auctor interdum justo molestie scelerisque. Duis nec ex tristique felis rutrum iaculis. In egestas dui eros, sit amet ultrices elit posuere vel. Morbi pulvinar lacus neque, id volutpat sapien tincidunt non. Vestibulum malesuada malesuada odio eu rutrum. In eget arcu est. Vivamus non tortor placerat, lacinia leo ac, eleifend lacus.

Phasellus at urna felis. Quisque tincidunt massa eget nisi aliquet gravida. Duis nulla est, rutrum aliquet aliquet vitae, pretium nec ligula. Donec aliquam neque erat, a sodales nulla pulvinar a. Phasellus ornare eget lectus non aliquet. Cras tincidunt elit et est rutrum fermentum a sit amet ante. Fusce facilisis egestas tellus nec lacinia. Nulla lacinia, nunc et laoreet elementum, diam nunc efficitur ante, non venenatis libero lacus ac ex. Cras risus mi, tincidunt sit amet orci sit amet, accumsan auctor sapien. Aliquam erat volutpat. Praesent volutpat mauris at ex blandit aliquet. Fusce lobortis ultricies ligula ac aliquam.

Suspendisse potenti. Donec cursus lacus ac nibh hendrerit, sit amet ullamcorper justo rutrum. In maximus tempus mauris, sed molestie odio laoreet eu. Cras iaculis ultrices leo, eget mattis ante molestie non. Maecenas vestibulum metus eget velit efficitur, porttitor pretium justo rutrum. Nam id sapien nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam eleifend id augue eget viverra. Aliquam ullamcorper, turpis nec volutpat dapibus, ante nibh sollicitudin eros, non faucibus metus diam sed arcu. Praesent vitae tristique velit, nec congue lorem. Sed facilisis elit a enim vestibulum varius. Nulla dapibus neque faucibus fringilla posuere. Cras pretium rutrum cursus.</div>
    </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Expense from '@/components/UI/Expense/Expense'
import Income from '@/components/UI/Income/Income'
import ReportHeader from './ReportHeader'
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
      let currentReport = []
      const currentReportIncome = []
      const currentReportExpense = {}
      this.user.monthlyReports.find((report, index) => {
        if (report.period === this.currentPeriod.value) {
          currentReport = this.user.monthlyReports[index]
          return true
        }
      })
      currentReport.details.forEach((detail, index) => {
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
  methods: {

  },
  components: {
    ReportHeader,
    Expense,
    Income
  }

}
</script>

<style lang="scss" scoped>
.report {
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

.test {
  height: 50vh;
  margin-top: 8rem;
}
</style>
