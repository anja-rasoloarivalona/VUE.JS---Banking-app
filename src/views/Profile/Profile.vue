<template>
    <div class="profile" :class="{isLight: theme.isLight, isDark: theme.isDark}">
        <profile-goal></profile-goal>
        <profile-header :userBudgetPlan="userBudgetPlan"></profile-header>

        <div class="profile__section">
            <div class="profile__section__title">
                <h1>Incomes</h1>
                <div class="profile__section__title__add" @click="openBackdrop('income')">
                    <app-icon name="add" size="large" :color="theme.isDark ? 'surface' : 'white'"></app-icon>
                </div>
            </div>
            <table class="profile__section__table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Frequency</th>
                    <th>Amount per transaction</th>
                    <th>Monthly average</th>
                  </tr>
                </thead>
                <tbody>
                    <income-line-table
                        v-for="(income, index) in user.incomes"
                        :key="index"
                        :income="income"
                    />
                   <tr class="profile__section__table__total">
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>Total</td>
                    <td><h3>{{userBudgetPlan.monthlyIncomes | amount}}</h3></td>
                  </tr>
                </tbody>
            </table>
        </div>

        <div class="profile__section">
            <div class="profile__section__title">
                <h1>Expenses</h1>
                <div class="profile__section__title__add" @click="openBackdrop('expense')">
                    <app-icon name="add" size="large" :color="theme.isDark ? 'surface' : 'white'"></app-icon>
                </div>
            </div>
            <table class="profile__section__table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Type</th>
                    <th>Monthly average</th>
                  </tr>
                </thead>
                <tbody>
                    <expense-line-table
                        v-for="(expense, index) in user.expenses"
                        :key="index"
                        :expense="expense"
                        :index="index"
                        :lastIndex="user.expenses.length"
                    />
                   <tr class="profile__section__table__total">
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>Total</td>
                    <td><h3>{{userBudgetPlan.monthlyExpenses | amount}}</h3></td>
                  </tr>
                </tbody>
            </table>
        </div>
        <div class="profile__section">
            <div class="profile__section__title">
                <h1>Wallets</h1>
                <div class="profile__section__title__add" @click="openBackdrop('wallet')">
                    <app-icon name="add" size="large" :color="theme.isDark ? 'surface' : 'white'"></app-icon>
                </div>
            </div>
            <div class="profile__section__list profile__section__list--wallets">
                <wallet v-for="wallet in user.wallets" :wallet="wallet" :key="wallet._id" @click.native="clickWallet(wallet)"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Wallet from '@/components/UI/Wallet'
import IncomeLineTable from '@/components/UI/Income/IncomeLineTable'
import ExpenseLineTable from '@/components/UI/Expense/ExpenseLineTable'
import ProfileHeader from './ProfileHeader'
import ProfileGoal from './ProfileGoal'
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
    userBudgetPlan () {
      let monthlyIncomes = 0
      let monthlyExpenses = 0

      // let monthlyVariableExpenses = 0
      // let monthlyFixedExpenses = 0
      this.user.incomes.forEach(income => {
        monthlyIncomes += income.amount * this.frequencyOptions.period[income.frequency.period] * this.frequencyOptions.counter[income.frequency.counter]
      })
      this.user.expenses.forEach(expense => {
        monthlyExpenses += expense.amount * this.frequencyOptions.period[expense.frequency.period] * this.frequencyOptions.counter[expense.frequency.counter]
      })
      return {
        monthlyIncomes: monthlyIncomes,
        monthlyExpenses: monthlyExpenses,
        monthlySavings: monthlyIncomes - monthlyExpenses
      }
    }
  },
  methods: {
    ...mapMutations([
      'openBackdrop',
      'setEditedWallet'
    ]),
    clickWallet (wallet) {
      this.setEditedWallet(wallet)
      this.openBackdrop('wallet')
    }
  },
  components: {
    ProfileHeader,
    ProfileGoal,
    IncomeLineTable,
    ExpenseLineTable,
    Wallet
  }
}
</script>

<style lang="scss" scoped>
.profile {
  width: calc(100% - 2rem);
  max-width: 120rem;
  background: var(--surfaceColor);
  border-radius: .5rem;
  margin-bottom: 5rem;
  padding: 3rem;
  &__section {
    // background: red;
    &__title {
      // background: green;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--textColor--dark);
      margin-bottom: 3rem;
      &__add {
        background: var(--secondaryColor);
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &__table {
      // background: blue;
      width: 100%;
      border-collapse: collapse;
      & th {
        height: 6rem;
        width: calc(100% / 4);
        text-align: start;
        border-bottom: 1px solid var(--lineColor);
        font-size: $font-s;
        background: var(--backgroundColor);
        color: var(--textColor--dark);
        border-collapse: collapse;
        padding-left: 2rem;
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
          padding-left: 2rem;
          height: 6rem;
          width: calc(100% / 5);
          font-size: $font-s;
           border-collapse: collapse;
        }
      }
    }
    &__list {
      &--wallets {
          display: grid;
          grid-template-columns: repeat(auto-fit, 27rem);
          grid-template-rows: 14rem;
          grid-auto-rows: 14rem;
          column-gap: 2rem;
          row-gap: 2rem;
          padding-bottom: 2rem;
        }
    }

}
</style>
