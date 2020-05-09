<template>
    <div class="plan">
        <header class="plan__header">
            <div class="plan__header__details">
                <h1>Monthly average</h1>
                <div class="plan__header__details__item">
                    <div class="plan__header__details__item__key">
                        Incomes
                    </div>
                    <div class="plan__header__details__item__value">
                        $ 1200
                    </div>
                </div>
                <div class="plan__header__details__item">
                    <div class="plan__header__details__item__key">
                        Expenses
                    </div>
                    <div class="plan__header__details__item__value">
                        $ 780
                    </div>
                </div>
                <div class="plan__header__details__item">
                    <div class="plan__header__details__item__key">
                        Savings
                    </div>
                    <div class="plan__header__details__item__value">
                        $ 420
                    </div>
                </div>
            </div>
            <div class="plan__header__chart">
                 <doughnut-chart :styles="chartStyles" :datacollection="data"></doughnut-chart>
            </div>
        </header>
        <div class="plan__item">
            <h2 class="plan__item__title">
                Incomes
            </h2>
            <div class="plan__item__details">
                <div class="plan__item__details__header">
                    <div>Name</div>
                    <div>Amount</div>
                    <div>Last Payout</div>
                    <div>Next Payout</div>
                </div>
                <ul class="plan__item__details__list">
                    <income-line-table
                       v-for="(income, index) in user.incomes"
                       :key="income._id"
                       :income="income"
                       :index="index">
                    </income-line-table>
                </ul>
            </div>
        </div>
        <div class="plan__item">
            <h2 class="plan__item__title">
                Expenses
            </h2>
            <div class="plan__item__details">
                <div class="plan__item__details__header">
                    <div>Name</div>
                    <div>Type</div>
                    <div>Amount</div>
                    <div>Next Payout</div>
                </div>
                <ul class="plan__item__details__list">
                    <expense-line-table v-for="(expense, index) in user.expenses" :key="index" :expense="expense" :index="index"></expense-line-table>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import DoughnutChart from '@/components/Charts/Doughnut'
import { mapGetters } from 'vuex'
import IncomeLineTable from '@/components/UI/IncomeLineTable'
import ExpenseLineTable from '@/components/UI/ExpenseLineTable'
export default {
  data () {
    return {
      data: null,
      chartStyles: {
        height: '130px',
        width: '100%',
        position: 'relative'
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created () {
    const labels = []
    const data = []
    const bg = []
    this.user.expenses.forEach(expense => {
      labels.push(expense.name)
      data.push(expense.amount)
      bg.push(expense.color)
    })
    this.data = {
      labels: labels,
      datasets: [
        { data: data, backgroundColor: bg }
      ]

    }
  },
  components: {
    DoughnutChart,
    IncomeLineTable,
    ExpenseLineTable
  }
}
</script>

<style lang="scss" scoped>
.plan {
    // background: blue;
    &__header {
        // background: salmon;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 3rem;
        &__details {
            // background: yellowgreen;
            width: 50%;
            & h1 {
                margin-bottom: 2rem;
            }
            &__item {
                display: flex;
                align-items: center;
                font-size: $font-m;
                margin-bottom: 2rem;
                &__key {
                    height: 100%;
                    width: 15rem;
                    // background: orange;
                }

            }
        }
        &__chart {
            // background: brown;
            width: 100%;
            height: 100%;
            flex: 1;
            position: relative;
            width: 100%;
            height: 13rem;
        }
    }
    &__item {
        // background: red;
        padding: 2rem;
        border: 1px solid var(--lineColor);
        margin-bottom: 2rem;
        border-radius: .5rem;
        &__title {
            text-transform: uppercase;
            margin-bottom: 2rem;
        }
        &__details {
            // background: blue;
            &__header {
                background: var(--backgroundColor);
                padding: 2rem 0;
                display: flex;
                font-size: $font-m;
                padding-left: 2rem;
                border-top-left-radius: .5rem;
                border-top-right-radius: .5rem;
                & div {
                    width: calc(100% / 4);
                    color: var(--textColor--dark)
                }
            }
            &__list {
                list-style: none
            }
        }
    }
}
</style>
