<template>
    <div class="header">
        <div class="header__details">
            <div class="header__details__title">
                <h1>Period</h1>
                <app-select-input v-model="period" :options="lists"/>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    Incomes
                </div>
                <div class="header__details__item__value">
                    ${{currentReport.income | amount}}
                </div>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    Expenses
                </div>
                <div class="header__details__item__value">
                    ${{currentReport.expense | amount}}
                </div>
            </div>
            <div class="header__details__item">
                <div class="header__details__item__key">
                    Savings
                </div>
                <div class="header__details__item__value">
                    ${{currentReport.savings | amount}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      period: '',
      lists: [],
      currentReport: {
        income: 0,
        expense: 0,
        savings: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  watch: {
    period: {
      handler: 'setPeriod',
      immediate: true
    }
  },
  methods: {
    setPeriod (val) {
      const reports = this.user.monthlyReports
      reports.find((report, index) => {
        if (report.period === val) {
          this.currentReport.income = reports[index].income
          this.currentReport.expense = reports[index].expense
          this.currentReport.savings = reports[index].income - reports[index].expense
        }
      })
      if (val !== '') {
        this.$emit('changePeriod', val)
      }
    }
  },
  mounted () {
    this.user.monthlyReports.forEach(report => {
      this.lists.push(report.period)
    })
    const d = new Date()
    const period = `${d.getMonth() + 1}-${d.getFullYear()}`
    this.period = period
  }
}
</script>

<style lang="scss" scoped>
.header {
    padding-left: 2rem;
    margin-bottom: 3rem;
    &__details {
        &__title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 3rem;
            width: 30rem;
            & label {
                margin-bottom: 0rem !important;
                width: 15rem;
            }
        }
        &__item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: $font-m;
            margin-bottom: 2rem;
            width: 30rem;
            &__key {
                color: var(--textColor--dark);
            }
        }
    }
}
</style>
