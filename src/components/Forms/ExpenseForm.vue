<template>
    <div class="expense-form">
      <slot />
      <form>
        <app-expense-input v-model="expense.genre"/>
        <app-select-input
            v-model="expense.expenseType"
            :id="$t('expenseType')"
            :options="[{value: 'Variable', i18: 'variable'}, {value: 'Fixed', i18: 'fixed'}]" i18
        />
        <app-basic-input
            v-model="expense.amount"
            :id="expense.expenseType.value === 'Variable' ? $t('amountPerMonth') : $t('amountPerTransaction')"
            v-if="expense.expenseType.value !== ''"
            type="number"
        />
        <app-basic-input
            v-model="expense.used"
            :id="$t('amountSpentThisMonth')"
            v-if="expense.expenseType.value === 'Variable'  && showAmountSpentThisMonth"
            type="number"
          />
        <app-frequency-input
            v-model="expense.frequency"
            :id="$t('frequency')"
            v-if="expense.expenseType.value === 'Fixed'"
        />
        <app-date-input
            v-model="expense.lastPayout"
            :id="$t('lastPaymentDate')"
            v-if="expense.expenseType.value === 'Fixed'"
        />
      </form>
      <div class="expense-form__cta">
            <app-btn normal secondary v-if="isCancelBtnDisplayed" @click.native="$emit('hideForm')">
                {{$t('cancel')}}
            </app-btn>
            <app-btn normal primary @click.native="submit" >
                <div v-if="!loading" v-text="editedExpense ? $t('edit') : $t('add')"></div>
                <app-spinner v-else></app-spinner>
            </app-btn>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import AppExpenseInput from '@/components/Input/ExpenseInput/ExpenseInput'
export default {
  data () {
    return {
      loading: false,
      showAmountSpentThisMonth: true,
      expense: {
        genre: {
          category: {
            value: '',
            i18: ''
          },
          subcategory: {
            value: '',
            i18: ''
          }
        },
        amount: 0,
        used: 0,
        expenseType: {
          value: '',
          i18: ''
        },
        lastPayout: new Date(),
        frequency: {
          counter: '',
          period: ''
        },
        color: '',
        alreadyUsedThisCurrentMonth: false
      }
    }
  },
  watch: {
    expense: {
      handler: 'setData',
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'editedExpense',
      'currentPeriodReport',
      'frequencyOptionsi18',
      'expensesList',
      'auth'
    ])
  },
  mounted () {
    if (this.editedExpense) {
      this.expense = {
        ...this.editedExpense,
        genre: {
          category: {
            name: this.editedExpense.category,
            i18: this.expensesList[this.editedExpense.category].i18
          },
          subcategory: {
            name: this.editedExpense.subcategory,
            i18: this.expensesList[this.editedExpense.category].subcategory[this.editedExpense.subcategory].i18
          }
        },
        expenseType: {
          value: this.editedExpense.expenseType,
          i18: this.editedExpense.expenseType === 'Variable' ? 'variable' : 'fixed'
        },
        frequency: {
          counter: {
            value: this.editedExpense.frequency.counter,
            i18: this.frequencyOptionsi18.counter[this.editedExpense.frequency.counter]
          },
          period: {
            value: this.editedExpense.frequency.period,
            i18: this.frequencyOptionsi18.period[this.editedExpense.frequency.period]
          }
        },
        lastPayout: this.editedExpense.lastPayout ? new Date(this.editedExpense.lastPayout) : new Date(),
        autoWriting: this.editedExpense.autoWriting ? 'yes' : 'no',
        notification: this.editedExpense.notification ? 'yes' : 'no'
      }
    }
  },
  methods: {
    ...mapActions([
      'addExpense',
      'editExpense'
    ]),
    ...mapMutations([
      'closeBackdrop'
    ]),
    close () {
      this.closeBackdrop()
      this.$emit('hideForm')
    },
    setData (expenseData) {
      const foundExpense = this.currentPeriodReport.details.find(detail => {
        if (expenseData.genre.category.name === detail.category && expenseData.genre.subcategory.name === detail.subcategory && expenseData.expenseType.value === 'Variable' && !this.auth.appStatus.includes('setup')) {
          this.expense.used = detail.amount
          this.showAmountSpentThisMonth = false
          this.expense.alreadyUsedThisCurrentMonth = true
          return true
        }
      })
      if (!foundExpense) {
        this.showAmountSpentThisMonth = true
        this.expense.alreadyUsedThisCurrentMonth = false
      }
    },
    submit: async function () {
      this.loading = true
      let result = false
      if (this.editedExpense) {
        result = await this.editExpense(this.expense)
      } else {
        result = await this.addExpense(this.expense)
      }
      if (result) {
        this.loading = false
        this.close()
      } else {
        this.loading = false
      }
    }
  },
  props: {
    edited: Object,
    isCancelBtnDisplayed: Boolean
  },
  components: {
    AppExpenseInput
  }
}
</script>

<style lang="scss" scoped>
.expense-form {
  & form {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 25rem);
      grid-template-rows: max-content;
      grid-auto-rows: max-content;
      column-gap: 1rem;
      row-gap: 1.5rem;
      align-items: center;
      justify-content: center;
      justify-items: center;
      padding: 1rem 0;
      & label {
        width: 100%
      }
      & label.frequency, & label.category-input-container {
      grid-column: 1 / -1;
      }
  }
  &__cta {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
      // position: relative;
      // z-index: 10;
  }
}
</style>
