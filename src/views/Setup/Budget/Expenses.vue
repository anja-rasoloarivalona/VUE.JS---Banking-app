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
                  <b>{{$t('addExpense')}}</b>
          </div>
          <form class="setup__view__content__form expenses__form">
            <app-category-input v-model="expense.genre"/>
            <app-select-input v-model="expense.expenseType" :id="$t('expenseType')"  :options="[{value: 'Variable', i18: 'variable'}, {value: 'Fixed', i18: 'fixed'}]" i18/>
            <app-basic-input v-model="expense.amount" :id="expense.expenseType === 'Variable' ? $t('amountPerMonth') : $t('amountPerTransaction')"  v-if="expense.expenseType !== ''"/>
            <app-basic-input v-model="expense.used" :id="$t('amountSpentThisMonth')"  v-if="expense.expenseType.value === 'Variable'"/>
            <app-frequency-input v-model="expense.frequency" :id="$t('frequency')" v-if="expense.expenseType.value === 'Fixed'"/>
            <app-date-input v-model="expense.lastPayout" :id="$t('lastPaymentDate')" v-if="expense.expenseType.value === 'Fixed'"/>
          </form>
        </template>

        <template v-else>
            <div class="setup__view__content--main">
              <h1 class="setup__view__content--main__title">{{$t('yourExpenses')}}</h1>
              <div class="setup__view__content--main__add" @mouseenter="addHovered = true" @mouseleave="addHovered = false" @click="openBackdrop('expense')">
                  <app-icon name="add" :color="addHovered ? 'white' : 'secondary'" size="extra-large"/>
              </div>
              <expense-table :expenses="user.expenses"/>
            </div>
        </template>

        <div class="setup__view__content__cta">
            <app-btn normal primary @click.native="setupExpenseAction">
                {{ user.expenses.length > 0 ? $t('next') : $t('add')}}
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
          counter: '',
          period: ''
        },
        color: ''
      }
    }
  },
  watch: {
    'expense.genre.category': function (next, prev) {
      if (next !== prev) {
        this.expense.genre.subcategory = {}
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
