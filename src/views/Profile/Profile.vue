<template>
    <div class="profile" :class="{isLight: theme.isLight, isDark: theme.isDark}">
        <profile-header :userBudgetPlan="userBudgetPlan"></profile-header>
        <div class="profile__item">
            <div class="profile__item__title">
                <h1>Incomes</h1>
                <div class="profile__item__title__add" @click="openBackdrop('income')">
                    <app-icon name="add" size="large" :color="theme.isDark ? 'dark' : 'white'"></app-icon>
                </div>
            </div>
            <div class="profile__item__details">
                <div class="profile__item__details__header">
                    <div>Name</div>
                    <div>Frequency</div>
                    <div>Amount / transaction</div>
                    <div>Monthly average</div>
                </div>
                <ul class="profile__item__details__list">
                    <income-line-table
                       v-for="(income, index) in user.incomes"
                       :key="income._id"
                       :income="income"
                       :index="index"
                       :lastIndex="user.incomes.length"
                    >
                    </income-line-table>
                </ul>
                <div class="profile__item__details__total">
                  <div></div>
                  <div></div>
                  <div class="profile__item__details__total__item profile__item__details__total__item--key"><h3>Total</h3></div>
                  <div class="profile__item__details__total__item"><h3>${{userBudgetPlan.monthlyIncomes | amount}}</h3></div>
                </div>
            </div>
        </div>
        <div class="profile__item">
            <div class="profile__item__title">
                <h1>Expenses</h1>
                <div class="profile__item__title__add" @click="openBackdrop('expense')">
                    <app-icon name="add" size="large" color="dark"></app-icon>
                </div>
            </div>
            <div class="profile__item__details">
                <div class="profile__item__details__header">
                    <div>Name</div>
                    <div>Category</div>
                    <div>Frequency</div>
                    <div>Monthly average</div>
                </div>
                <ul class="profile__item__details__list">
                    <expense-line-table
                        v-for="(expense, index) in user.expenses"
                        :key="index"
                        :expense="expense"
                        :index="index"
                        :lastIndex="user.expenses.length"
                    >
                    </expense-line-table>
                </ul>
                <div class="profile__item__details__total">
                  <div></div>
                  <div></div>
                  <div class="profile__item__details__total__item"><h3>Total</h3></div>
                  <div class="profile__item__details__total__item"><h3>${{userBudgetPlan.monthlyExpenses | amount}}</h3></div>
                </div>
            </div>
        </div>
        <div class="profile__item">
            <div class="profile__item__title">
                <h1>Wallets</h1>
                <div class="profile__item__title__add" @click="openBackdrop('wallet')">
                    <app-icon name="add" size="large" color="dark"></app-icon>
                </div>
            </div>
            <div class="profile__item__details">
                <div class="profile__item__details__list profile__item__details__list--wallets">
                  <wallet v-for="wallet in user.wallets" :wallet="wallet" :key="wallet._id" @click.native="clickWallet(wallet)"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Wallet from '@/components/UI/Wallet'
import IncomeLineTable from '@/components/UI/IncomeLineTable'
import ExpenseLineTable from '@/components/UI/ExpenseLineTable'
import ProfileHeader from './ProfileHeader'
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
    &__item {
        padding: 2rem;
        margin-bottom: 6rem;
        border-radius: .5rem;
        background: var(--backgroundColor);
        :not(:last-child){

        }
        &__title {
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
                list-style: none;
                // background: red;
                &--wallets {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, 27rem);
                  grid-template-rows: 14rem;
                  grid-auto-rows: 14rem;
                  column-gap: 2rem;
                  row-gap: 2rem;
                  padding: 0 2rem;
                  padding-bottom: 2rem;

                }
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
                &--key {
                    color: var(--textColor--dark)
                }
              }
              & div {
                width: calc(100% / 4);
              }
            }
        }
    }
    &.isDark {
      & .profile__item {
          // border: 1px solid var(--lineColor);
          &__title {
          &__add {
            border: 1px solid var(--textColor--dark);
            &:hover {
              border: 1px solid $color-white;
            }
          }
        }
      }
    }
    &.isLight {
      & .profile__item {
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
            border: 1px solid var(--textColor--dark);
          }
        }
      }
    }
}
</style>
