<template>
    <div class="plan" :class="{isLight: theme.isLight, isDark: theme.isDark}">
        <plan-header :userBudgetPlan="userBudgetPlan"></plan-header>
        <div class="plan__item">
            <div class="plan__item__title">
                <h1>Incomes</h1>
                <div class="plan__item__title__add" @click="openBackdrop('income')">
                    <app-icon name="add" size="large" :color="theme.isDark ? 'grey' : 'white'"></app-icon>
                </div>
            </div>
            <div class="plan__item__details">
                <div class="plan__item__details__header">
                    <div>Name</div>
                    <div>Frequency</div>
                    <div>Amount / transaction</div>
                    <div>Monthly average</div>
                </div>
                <ul class="plan__item__details__list">
                    <income-line-table
                       v-for="(income, index) in user.incomes"
                       :key="income._id"
                       :income="income"
                       :index="index"
                       :lastIndex="user.incomes.length"
                    >
                    </income-line-table>
                </ul>
                <div class="plan__item__details__total">
                  <div></div>
                  <div></div>
                  <div class="plan__item__details__total__item"><h3>Total</h3></div>
                  <div class="plan__item__details__total__item"><h3>${{userBudgetPlan.monthlyIncomes | amount}}</h3></div>
                </div>
            </div>
        </div>
        <div class="plan__item">
            <div class="plan__item__title">
                <h1>Fixed Expenses</h1>
                <div class="plan__item__title__add" @click="openBackdrop('expense')">
                    <app-icon name="add" size="large" color="grey"></app-icon>
                </div>
            </div>
            <div class="plan__item__details">
                <div class="plan__item__details__header">
                    <div>Name</div>
                    <div>Frequency</div>
                    <div>Amount / transaction</div>
                    <div>Monthly average</div>
                </div>
                <ul class="plan__item__details__list">
                    <expense-line-table
                        v-for="(expense, index) in userFixedExpenses"
                        :key="index"
                        :expense="expense"
                        :index="index"
                        :lastIndex="userFixedExpenses.length"
                    >
                    </expense-line-table>
                </ul>
                <div class="plan__item__details__total">
                  <div></div>
                  <div></div>
                  <div class="plan__item__details__total__item"><h3>Total</h3></div>
                  <div class="plan__item__details__total__item"><h3>${{userBudgetPlan.monthlyFixedExpenses | amount}}</h3></div>
                </div>
            </div>
        </div>
        <div class="plan__item">
            <div class="plan__item__title">
                <h1>Variable Expenses</h1>
                <div class="plan__item__title__add" @click="openBackdrop('expense')">
                    <app-icon name="add" size="large" color="grey"></app-icon>
                </div>
            </div>
            <div class="plan__item__details">
                <div class="plan__item__details__header">
                    <div>Name</div>
                    <div>Category</div>
                    <div>Frequency</div>
                    <div>Monthly average</div>
                </div>
                <ul class="plan__item__details__list">
                    <expense-line-table
                        v-for="(expense, index) in userVariableExpenses"
                        :key="index"
                        :expense="expense"
                        :index="index"
                        :lastIndex="userVariableExpenses.length"
                    >
                    </expense-line-table>
                </ul>
                <div class="plan__item__details__total">
                  <div></div>
                  <div></div>
                  <div class="plan__item__details__total__item"><h3>Total</h3></div>
                  <div class="plan__item__details__total__item"><h3>${{userBudgetPlan.monthlyVariableExpenses | amount}}</h3></div>
                </div>
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
      data: null
    }
  },
  mounted () {
    window.scroll(0, 0)
  },
  computed: {
    ...mapGetters([
      'user',
      'frequencyOptions',
      'theme'
    ]),
    userFixedExpenses () {
      return this.user.expenses.filter(expense => expense.expenseType === 'fixed')
    },
    userVariableExpenses () {
      return this.user.expenses.filter(expense => expense.expenseType === 'variable')
    },
    userBudgetPlan () {
      let monthlyIncomes = 0
      let monthlyVariableExpenses = 0
      let monthlyFixedExpenses = 0
      this.user.incomes.forEach(income => {
        monthlyIncomes += income.amount * this.frequencyOptions.period[income.frequency.period] * this.frequencyOptions.counter[income.frequency.counter]
      })
      this.user.expenses.forEach(expense => {
        if (expense.expenseType === 'variable') {
          monthlyVariableExpenses += expense.amount * this.frequencyOptions.period[expense.frequency.period] * this.frequencyOptions.counter[expense.frequency.counter]
        }
        if (expense.expenseType === 'fixed') {
          monthlyFixedExpenses += expense.amount * this.frequencyOptions.period[expense.frequency.period] * this.frequencyOptions.counter[expense.frequency.counter]
        }
      })
      return {
        monthlyIncomes: monthlyIncomes,
        monthlyVariableExpenses: monthlyVariableExpenses,
        monthlyFixedExpenses: monthlyFixedExpenses,
        monthlySavings: monthlyIncomes - monthlyVariableExpenses - monthlyFixedExpenses
      }
    }
  },
  methods: {
    ...mapMutations([
      'openBackdrop'
    ])
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
        margin-bottom: 2rem;
        border-radius: .5rem;
        :not(:last-child){

        }
        // background: var(--on-surfaceColor);
        &__title {
            // text-transform: uppercase;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            & h1 {
              color: var(--textColor--dark)
            }
            &__add {
                border-radius: 50%;
                border: 1px solid var(--textColor--dark);
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        &__details {
            &__header {
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
            &__total {
              padding: 2rem 0;
              padding-left: 2rem;
              font-size: $font-m;
              display: flex;
              border-bottom-left-radius: .5rem;
              border-bottom-right-radius: .5rem;
              &__item {
                font-size: $font-m;
              }
              & div {
                width: calc(100% / 4);
              }
            }
        }
    }
    &.isDark {
      & .plan__item {
          border: 1px solid var(--lineColor);
      }
    }
    &.isLight {
      & .plan__item {
        &__details {
          &__header {
            background: var(--mainColor);
            & div {
              color: $color-white
            }
          }
          &__total {
            border-top: 1px solid var(--lineColor);
          }
        }
        &__title {
          &__add {
            border: 1px solid var(--secondaryColor);
            background: var(--secondaryColor)
          }
        }
      }
    }
}
</style>
