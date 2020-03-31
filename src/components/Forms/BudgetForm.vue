<template>
  <div class="budget-form-container">
      <div class="budget-form__close" @click="$emit('closeForm')">
                    <app-icon name="close" size="large" color="primary"/>
      </div>
      <form class="budget-form">
              <template v-if="type === 'income'">
                  <app-basic-input v-model="income.name" :id="'name'" />
                  <app-basic-input v-model="income.amount" :id="'amount'"  />
                  <app-basic-input v-model="income.from" :id="'from'" />
                  <app-frequency-input v-model="income.frequency" :id="'frequency'"/>
                  <div class="input-date">
                      <label for="lastPayout">
                          <span>last payout</span>
                          <app-date-picker v-model='income.lastPayout' id="lastPayout"/>
                      </label>
                  </div>
                  <app-select-input :id="'auto writing'"  :options="['yes', 'no']" v-model="income.autoWriting" />
                  <app-select-input :id="'notification'"  :options="['yes', 'no']" v-model="income.notification" />
              </template>
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
      <div class="budget-preview">
        <div class="budget-preview__color">
          <app-color-input v-model="income.color" v-if="type === 'income'"></app-color-input>
          <app-color-input v-model="expense.color" v-else></app-color-input>
        </div>
        <div class="budget-preview__item">
          <component :is="type" :income="income" :expense="expense" large></component>
        </div>
      </div>
  </div>
</template>

<script>
import { editIncomeQuery, addIncomeQuery } from '@/graphQL/incomeQuery'
import { editExpenseQuery, addExpenseQuery } from '@/graphQL/expenseQuery'
import Income from '@/components/UI/Income'
import Expense from '@/components/UI/Expense'
export default {
  data () {
    return {
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
    type: String,
    selected: Object
  },
  mounted () {
    if (this.selected) {
      console.log(this.selected)
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
    submit () {
      if (this.type === 'income') {
        if (this.selected) {
          this.editIncome()
        } else {
          this.addIncome()
        }
      }
      if (this.type === 'expense') {
        if (this.selected) {
          this.editExpense()
        } else {
          this.addExpense()
        }
      }
    },
    addIncome: async function () {
      this.loading = true
      const graphqlQuery = addIncomeQuery(this.income)
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.addIncome
        responseData.type = 'incomes'
        responseData.nextPayout = new Date(responseData.nextPayout)
        this.$store.commit('addUserItem', responseData)
        this.$emit('closeForm')
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    editIncome: async function () {
      this.loading = true
      const graphqlQuery = editIncomeQuery(this.income)
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.editIncome
        responseData.type = 'incomes'
        responseData.nextPayout = new Date(responseData.nextPayout)
        this.$store.commit('editUserItem', responseData)
        this.$emit('closeForm')
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    addExpense: async function () {
      this.loading = true
      const graphqlQuery = addExpenseQuery(this.expense)
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.addExpense
        responseData.type = 'expenses'
        this.$store.commit('addUserItem', responseData)
        this.$emit('closeForm')
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    editExpense: async function () {
      this.loading = true
      const graphqlQuery = editExpenseQuery(this.expense)
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.editExpense
        responseData.type = 'expenses'
        this.$store.commit('editUserItem', responseData)
        this.$emit('closeForm')
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    }
  },
  components: {
    Income,
    Expense
  }
}
</script>

<style lang="scss">
.budget-form-container {
  display: flex;
  position: relative;
}
.budget-form {
    background: var(--app-bg-primary);
    width: 40%;
    padding-top: 2rem;
    position: relative;
    padding-bottom: 5rem;
    // & .input {
    //   background: salmon;
    // }
    & button {
        position: absolute;
        bottom: 1rem;
    }
    &__close {
        position: absolute;
        right: 0rem;
        top: -4rem;
    }
}
.budget-preview {
  width: 60%;
  display: flex;
  flex-direction: column;
  &__color {
    display: flex;
    justify-content: center;
    padding-top: 2rem;
  }
  &__item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
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
    background: var(--app-item-bg) !important;
}

.vc-text-base {
    font-size: 13px !important;
    font-family: "Open Sans", sans-serif !important;
    color: var(--app-text-color) !important;
}

</style>
