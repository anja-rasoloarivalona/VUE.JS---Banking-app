<template>
  <div class="budget-form-container">
      <form class="budget-form">
              <!------------------------------- INCOME TEMPLATE ----------------------------->
              <template v-if="currentType === 'income'">
                  <app-basic-input v-model="income.name" :id="'name'" />
                  <app-basic-input v-model="income.amount" :id="'amount'"  />
                  <app-date-input v-model="income.lastPayout" :id="'last payout'"/>
                  <app-basic-input v-model="income.from" :id="'from'" />
                  <app-select-input :id="'auto writing'"  :options="['yes', 'no']" v-model="income.autoWriting" />
                  <app-select-input :id="'notification'"  :options="['yes', 'no']" v-model="income.notification" />
                  <app-frequency-input v-model="income.frequency" :id="'frequency'"/>
              </template>
              <!------------------------------- EXPENSE TEMPLATE ----------------------------->
              <template v-if="currentType === 'expense'">
                  <app-basic-input v-model="expense.name" :id="'name'" />
                  <app-basic-input v-model="expense.amount" :id="'amount'"  />
                  <app-basic-input v-model="expense.category" :id="'category'" />
                  <app-select-input v-model="expense.expenseType" :id="'Expense Type'"  :options="['variable', 'fixed']"/>
                  <app-basic-input v-model="expense.used" :id="'used'"  v-if="expense.expenseType === 'variable'"/>
                  <app-frequency-input
                      :id="'frequency'"
                      v-model="expense.frequency"
                      @selectcounter="expense.frequency.counter = $event"
                      @selectPeriod="expense.frequency.period = $event"
                      v-if="expense.expenseType === 'fixed'"
                  />
                  <app-date-input v-model="expense.lastPayout" id="last payout" v-if="expense.expenseType === 'fixed'"/>
              </template>
              <div class="budget-form__cta">
                <app-btn normal warning v-if="isCancelBtnDisplayed" @click.native="$emit('hideForm')">Cancel</app-btn>
                <app-btn normal primary @click.native="submit" >
                    <span v-if="!loading" v-text="selected ? 'Edit' : 'Add'"></span>
                    <app-spinner v-else></app-spinner>
                </app-btn>
              </div>
      </form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      currentType: 'income',
      attrs: [
        {
          key: 'today',
          highlight: true,
          dates: new Date()
        }
      ],
      date: new Date(),

      income: {
        name: '',
        amount: 0,
        from: '',
        frequency: {
          counter: 'once',
          period: 'a day'
        },
        lastPayout: new Date(),
        autoWriting: 'yes',
        notification: 'yes',
        color: 'red'
      },
      expense: {
        name: '',
        amount: 0,
        category: '',
        used: 0,
        expenseType: 'variable',
        lastPayout: new Date(),
        frequency: {
          counter: 'once',
          period: 'a day'
        }
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'secondaryColors'
    ])
  },
  props: {
    selected: Object,
    type: String,
    isCancelBtnDisplayed: Boolean
  },
  watch: {
    type: {
      handler: 'setCurrentType',
      immediate: true
    }
  },
  mounted () {
    console.log('mounted', this.type)
    if (this.selected) {
      this[this.type] = {
        ...this.selected,
        lastPayout: new Date(this.selected.lastPayout),
        autoWriting: this.selected.autoWriting ? 'yes' : 'no',
        notification: this.selected.notification ? 'yes' : 'no'
      }
      this.color = this.selected.color
    }
  },
  methods: {
    ...mapActions([
      'addIncome',
      'editIncome',
      'addExpense',
      'editExpense'
    ]),
    ...mapMutations([
      'closeBackdrop'
    ]),
    setCurrentType () {
      console.log('fired')
      console.log(this.type)
      this.currentType = this.type
      console.log(this.currentType)
    },
    submit: async function () {
      this.loading = true
      let result = false
      // SUBMIT INCOME
      if (this.currentType === 'income') {
        if (this.selected) {
          result = await this.editIncome(this.income)
        } else {
          result = await this.addIncome(this.income)
        }
      }
      // SUBMIT EXPENSE
      if (this.currentType === 'expense') {
        const expenseData = {
          ...this.expense,
          color: this.secondaryColors[this.user.expenses.length]
        }
        if (this.selected) {
          result = await this.editExpense(expenseData)
        } else {
          console.log('adding expense')
          result = await this.addExpense(expenseData)
        }
      }
      // CHECK RESULT
      if (!this.externType) {
        if (result) {
          this.loading = false
          this.closeBackdrop()
          this.$router.push('budget')
        } else {
          this.loading = false
        }
      } else {
        this.loading = false
        this.$emit('hideForm')
      }
    }
  }
}
</script>

<style lang="scss">
.budget-form-container {
  display: flex;
  height: 100%;
}
.budget-form {
    width: 100%;
    padding-bottom: 4rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    column-gap: 2rem;
    row-gap: 1rem;
    & .input.frequency {
      grid-column: 1 / 3;
    }
    &__cta {
        height: 8rem;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        // background: red;
        display: flex;
        align-items: center;
        justify-content: center;
        // & button {
        //   height: 3.5rem;
        // }
    }
    &__close {
        position: absolute;
        right: 0rem;
        top: -4rem;
    }
}

</style>
