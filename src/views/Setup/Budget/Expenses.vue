<template>
    <div class="setup__view__content expenses"
        :class="{
          right: ['currency', 'wallets', 'incomes'].includes(setup.currentSetupStep),
          left: setup.currentSetupStep === 'goal',
          expand: user.expenses.length > 0
        }"
    >
        <div class="setup__view__content__imgContainer">
            <app-icon name="expense" :size="user.expenses.length > 0 ? 'extra-large' : 'xxl'" />
        </div>

        <template v-if="user.expenses.length === 0">
          <div class="setup__view__content__title">
                  <b>Add expense</b>
          </div>
          <form class="setup__view__content__form expenses__form">
            <app-category-input v-model="expense.genre"/>
            <app-select-input v-model="expense.expenseType" id="Expense Type"  :options="['Variable', 'Fixed']"/>
            <app-basic-input v-model="expense.amount" :id="expense.expenseType === 'Variable' ? 'Amount per month' : 'Amount per transaction'"  v-if="expense.expenseType !== ''"/>
            <app-basic-input v-model="expense.used" id="Amount spent this month"  v-if="expense.expenseType === 'Variable'"/>
            <app-frequency-input v-model="expense.frequency" id="Frequency" v-if="expense.expenseType === 'Fixed'"/>
            <app-date-input v-model="expense.lastPayout" id="Last payout" v-if="expense.expenseType === 'Fixed'"/>
          </form>
        </template>

        <template v-else>
            <div class="setup__view__content--main">
              <h1 class="setup__view__content--main__title">Your expenses</h1>
              <div class="setup__view__content--main__add" @mouseenter="addHovered = true" @mouseleave="addHovered = false" @click="openBackdrop('expense')">
                  <app-icon name="add" :color="addHovered ? 'white' : 'secondary'" size="extra-large"/>
              </div>
              <expense-table :expenses="user.expenses"/>
            </div>
        </template>

        <div class="setup__view__content__cta">
            <app-btn normal primary @click.native="setupExpenseAction">
                {{ user.expenses.length > 0 ? 'Next' : 'Add'}}
            </app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ExpenseTable from '@/components/UI/Expense/ExpenseTable'
import AppCategoryInput from '@/components/Input/CategoryInput/CategoryInput'
export default {
  data () {
    return {
      addHovered: false,
      loading: false,
      expense: {
        genre: {
          category: {

          },
          subcategory: {

          }
        },
        name: '',
        amount: 0,
        used: 0,
        expenseType: '',
        lastPayout: new Date(),
        frequency: {
          counter: 'once',
          period: 'a day'
        },
        color: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'setup',
      'user'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentSetupStep',
      'openBackdrop'
    ]),
    ...mapActions([
      'addExpense'
    ]),
    addExpenseHandler: async function () {
      this.loading = false
      const result = await this.addExpense(this.expense)
      console.log('expense added', result)
    },
    setupExpenseAction () {
      if (this.user.expenses.length < 1) {
        this.addExpenseHandler()
      } else {
        this.setCurrentSetupStep('goal')
      }
    }
  },
  components: {
    AppCategoryInput,
    ExpenseTable
  }
}
</script>

<style lang="scss" scoped>
.expenses {
    width: 60%;
    max-width: 60rem;
  & label.frequency, & label.category-input-container {
      grid-column: 1 / -1;
  }
}
</style>
