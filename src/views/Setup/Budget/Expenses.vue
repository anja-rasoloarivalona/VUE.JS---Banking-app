<template>
    <div class="setup__view__content expenses"
        :class="{
          right: ['currency', 'wallets', 'incomes'].includes(setup.currentSetupStep),
          left: setup.currentSetupStep === 'goal',
          expand: user.expenses.length > 0
        }"
    >
        <div class="setup__view__content__imgContainer">
            <app-icon name="expense" :size="'xxl'" />
        </div>

        <template v-if="user.expenses.length === 0">
          <div class="setup__view__content__title">
                  <b>Add expense</b>
          </div>
          <form class="setup__view__content__form expenses__form">
            <app-category-input v-model="expense.genre"/>
            <!-- <app-basic-input v-model="expense.name" id="Name" /> -->
            <app-basic-input v-model="expense.amount" id="Amount"  />
            <!-- <app-basic-input v-model="expense.category" id="Category" /> -->
            <app-select-input v-model="expense.expenseType" id="Expense Type"  :options="['variable', 'fixed']"/>
            <app-basic-input v-model="expense.used" id="Used"  v-if="expense.expenseType === 'variable'"/>
            <app-frequency-input v-model="expense.frequency" id="Frequency" v-if="expense.expenseType === 'fixed'"/>
            <app-date-input v-model="expense.lastPayout" id="Last payout" v-if="expense.expenseType === 'fixed'"/>
          </form>
        </template>

        <template v-else>
            <div class="expenses__content">
              <h1 class="expenses__content__title">Your expenses</h1>
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
import AppCategoryInput from '@/components/Input/CategoryInput/CategoryInput'
export default {
  data () {
    return {
      loading: false,
      expense: {
        genre: {
          category: 'Food and Drinks',
          subcategory: 'Alimentation'
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
      'setCurrentSetupStep'
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
    AppCategoryInput
  }
}
</script>

<style lang="scss" scoped>
.expenses {
    width: 60%;
    max-width: 60rem;
  &__form {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 25rem);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    column-gap: 1rem;
    row-gap: 1rem;
    align-items: center;
    justify-content: center;
    justify-items: center;
    padding: 1rem 0;
    & label.frequency, & label.category-input-container {
      grid-column: 1 / -1;
    }
  }
  &__content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding:  0 3rem;
        &__title {
            display: flex;
            align-items: center;
            height: 10rem;
            color: var(--textColor--dark);
            margin-bottom: 3rem;
        }
    }
}
</style>
