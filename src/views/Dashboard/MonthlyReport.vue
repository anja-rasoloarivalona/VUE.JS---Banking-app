<template>
    <div class="monthly dashboard__section">
        <h2 class="dashboard__section__title">Monthly report</h2>
        <div class="monthly__details">
            <div class="monthly__details__item monthly__details__item--income">
                <h3>Income</h3>
                <div class="monthly__details__item__amount">
                    <app-icon name="arrow" color="primary" />
                    <div>${{report.income | amount}}</div>
                </div>
            </div>
            <div class="monthly__details__item monthly__details__item--expense">
                <h3>Expense</h3>
                <div class="monthly__details__item__amount">
                    <app-icon name="arrow" color="grey" />
                    <div>${{report.expense | amount}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'user'
    ]),
    report () {
      const currentReport = {}
      const d = new Date()
      const period = `${d.getMonth() + 1}-${d.getFullYear()}`
      const monthlyReports = this.user.monthlyReports
      if (monthlyReports.length > 0) {
        monthlyReports.find((report, index) => {
          if (report.period === period) {
            currentReport.income = monthlyReports[index].income
            currentReport.expense = monthlyReports[index].expense
          }
        })
        if (!currentReport.income && !currentReport.expense) {
          currentReport.income = 0
          currentReport.expense = 0
        }
      } else {
        currentReport.income = 0
        currentReport.expense = 0
      }
      return currentReport
    }
  }
}
</script>

<style lang="scss">
.monthly {
    padding: 1rem;
    padding-left: 3rem;
    & h2 {
        margin-bottom: 1rem;
    }

    &__details {
        display: flex;
        &__item {
            width: 100%;
            & h3 {
                margin-bottom: 1rem;
                color: var(--app-title-color-secondary)
            }
            &--expense{
               & svg {
                    transform: rotate(180deg);
                }
            }
            &__amount {
                display: flex;
                align-items: center;
                font-size: $font-m;
                & svg {
                    margin-right: 1rem;
                }
            }
        }
    }
}
</style>
