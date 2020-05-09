<template>
    <div class="plan">
        <plan-header></plan-header>
        <div class="plan__item">
            <div class="plan__item__title">
                <h2>Incomes</h2>
                <div class="plan__item__title__add" @click="openBackdrop('income')">
                    <app-icon name="add" size="large" color="secondary"></app-icon>
                </div>
            </div>
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
            <div class="plan__item__title">
                <h2>Expenses</h2>
                <div class="plan__item__title__add" @click="openBackdrop('expense')">
                    <app-icon name="add" size="large" color="secondary"></app-icon>
                </div>
            </div>
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
import { mapGetters, mapMutations } from 'vuex'
import IncomeLineTable from '@/components/UI/IncomeLineTable'
import ExpenseLineTable from '@/components/UI/ExpenseLineTable'
import PlanHeader from './PlanHeader'
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
  methods: {
    ...mapMutations([
      'openBackdrop'
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
    PlanHeader,
    IncomeLineTable,
    ExpenseLineTable
  }
}
</script>

<style lang="scss" scoped>
.plan {
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
            &__add {
                // background: red;
                border-radius: 50%;
                border: 1px solid var(--textColor--dark);
                display: flex;
                align-items: center;
                justify-content: center;
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
