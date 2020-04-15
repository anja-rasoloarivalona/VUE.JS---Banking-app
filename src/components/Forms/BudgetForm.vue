<template>
  <div class="budget-form-container">
      <form class="budget-form">
              <app-select-input v-model="type" :id="'type'" :options="['income', 'expense']"/>
              <!------------------------------- INCOME TEMPLATE ----------------------------->
              <template v-if="type === 'income'">
                  <app-basic-input v-model="income.name" :id="'name'" />
                  <app-basic-input v-model="income.amount" :id="'amount'"  />
                  <div class="input-date">
                      <label for="lastPayout">
                          <span>last payout</span>
                          <app-date-picker v-model='income.lastPayout' id="lastPayout"/>
                      </label>
                  </div>
                  <app-basic-input v-model="income.from" :id="'from'" />
                  <app-select-input :id="'auto writing'"  :options="['yes', 'no']" v-model="income.autoWriting" />
                  <app-frequency-input v-model="income.frequency" :id="'frequency'"/>
                  <app-select-input :id="'notification'"  :options="['yes', 'no']" v-model="income.notification" />
              </template>
              <!------------------------------- EXPENSE TEMPLATE ----------------------------->
              <template v-if="type === 'expense'">
                  <app-basic-input v-model="expense.name" :id="'name'" />
                  <app-basic-input v-model="expense.amount" :id="'amount'"  />
                  <app-basic-input v-model="expense.category" :id="'category'" />
                  <app-select-input v-model="expense.expenseType" :id="'Expense Type'"  :options="['variable', 'fixed']"/>
                  <app-basic-input v-model="expense.used" :id="'used'"  v-if="expense.expenseType === 'variable'"/>
                  <div class="input-date" v-if="expense.expenseType === 'fixed'">
                      <label for="lastPayout">
                          <span>last payout</span>
                          <app-date-picker v-model='expense.lastPayout' id="lastPayout"/>
                      </label>
                  </div>
                  <app-frequency-input
                      :id="'frequency'"
                      v-model="expense.frequency"
                      @selectcounter="expense.frequency.counter = $event"
                      @selectPeriod="expense.frequency.period = $event"
                      v-if="expense.expenseType === 'fixed'"
                  />
              </template>
              <app-btn normal primary @click.native="submit" >
                  <span v-if="!loading" v-text="selected ? 'Edit' : 'Add'"></span>
                  <app-spinner v-else></app-spinner>
              </app-btn>
      </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      type: 'income',
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
        lastPayout: '',
        frequency: {
          counter: 'once',
          period: 'a day',
          color: 'red'
        }
      },
      loading: false
    }
  },
  props: {
    selected: Object
  },
  mounted () {
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
    submit: async function () {
      this.loading = true
      let result = false
      // SUBMIT INCOME
      if (this.type === 'income') {
        if (this.selected) {
          result = await this.editIncome(this.income)
        } else {
          result = await this.addIncome(this.income)
        }
      }
      // SUBMIT EXPENSE
      if (this.type === 'expense') {
        if (this.selected) {
          result = await this.editExpense(this.expense)
        } else {
          result = await this.addExpense(this.expense)
        }
      }
      // CHECK RESULT
      if (result) {
        this.loading = false
        this.closeBackdrop()
        this.$router.push('budget')
      } else {
        this.loading = false
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
    padding-bottom: 7rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    column-gap: 2rem;
    row-gap: 1rem;
    & .input.frequency {
      grid-column: 1 / 3;
    }
    & button {
        position: absolute;
        bottom: 3rem;
        right: 3rem
    }
    &__close {
        position: absolute;
        right: 0rem;
        top: -4rem;
    }
}

.input-date {
  display: flex;
  flex-direction: column;
  width: 100%;
    & label {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }
    & span {
        width: 100%;
        margin-bottom: 0.5rem;
        font-size: 13px;
        &:first-child {
            color: $color-grey--dark;
        }
        & input {
            height: 4rem;
        }
    }
}
.vc-border {
    border-width: 0px !important;
}
.vc-bg-white {
    background: var(--surfaceColor) !important;
}

.vc-text-base {
    font-size: 13px !important;
    font-family: "Open Sans", sans-serif !important;
    color: var(--textColor) !important;
}

</style>
