<template>
    <form class="budget-form">
            <div class="budget-form__close" @click="$emit('closeForm')">
                  <app-icon name="close" size="large" color="primary"/>
            </div>
            <template v-if="type === 'income'">
                <app-basic-input v-model="income.name" :id="'name'" bgWhite/>
                <app-basic-input v-model="income.amount" :id="'amount'" bgWhite />
                <app-basic-input v-model="income.from" :id="'from'" bgWhite/>
                <app-frequency-input
                    :id="'frequency'"
                    v-model="income.frequency"
                    @selectcounter="income.frequency.counter = $event"
                    @selectPeriod="income.frequency.period = $event"
                />
                <div class="input-date">
                    <label for="lastPayout">
                        <span>last payout</span>
                        <app-date-picker v-model='income.lastPayout' id="lastPayout"/>
                    </label>
                </div>
                <app-select-input :id="'auto writing'"  :options="['yes', 'no']" @selectInput="income.autoWriting = $event" bgWhite />
                <app-select-input :id="'notification'"  :options="['yes', 'no']" @selectInput="income.notification = $event" bgWhite />
            </template>
            <template v-if="type === 'expense'">
                <app-basic-input v-model="expense.name" :id="'name'" bgWhite/>
                <app-basic-input v-model="expense.amount" :id="'amount'" bgWhite />
                <app-basic-input v-model="expense.category" :id="'category'" bgWhite/>
                <app-select-input :id="'Expense Type'"  :options="['variable', 'fixed']" @selectInput="expense.expenseType = $event" bgWhite />
            </template>

            <app-btn normal primary @click.native="submit" >
                <span v-if="!loading">Add</span>
                <app-spinner v-else></app-spinner>
            </app-btn>
    </form>
</template>

<script>
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
        notification: 'yes'
      },
      expense: {
        name: '',
        amount: 0,
        category: '',
        expenseType: 'variable'
      },
      loading: false
    }
  },
  props: {
    type: String
  },
  methods: {
    submit () {
      if (this.type === 'income') {
        this.addIncome()
      } else {
        this.addExpense()
      }
    },
    addIncome: async function () {
      this.loading = true
      const graphqlQuery = {
        query: `mutation {
                    addIncome(incomeInput: {
                        name: "${this.income.name}",
                        amount: "${this.income.amount}",
                        from: "${this.income.from}",
                        frequency: {
                            counter: "${this.income.frequency.counter}",
                            period: "${this.income.frequency.period}"
                        }
                        lastPayout: "${this.income.lastPayout}",
                        autoWriting: "${this.income.autoWriting}",
                        notification: "${this.income.notification}"
                    }) {
                        _id
                        name
                        amount
                        from
                        frequency {
                            counter
                            period
                        }
                        lastPayout
                        autoWriting
                        notification
                        owner
                    }
              }`
      }
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.addIncome
        this.$emit('closeForm')
        this.$store.commit('addIncome', responseData)
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    addExpense: async function () {
      this.loading = true
      const graphqlQuery = {
        query: `mutation {
                    addExpense(expenseInput: {
                        name: "${this.expense.name}",
                        amount: "${this.expense.amount}",
                        category: "${this.expense.category}",
                        expenseType: "${this.expense.expenseType}"
                    }) {
                        _id
                        name
                        amount
                        category
                        expenseType
                        used
                        owner
                    }
              }`
      }
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.addExpense
        this.$emit('closeForm')
        this.$store.commit('addExpense', responseData)
        console.log('added expense', responseData)
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">
.budget-form {
    margin-top: 4rem;
    background: $color-grey--light;
    width: 100%;
    padding: 2rem;
    padding-top: 4rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    column-gap: 2rem;
    position: relative;
    padding-bottom: 5rem;
    & button {
        position: absolute;
        bottom: 1rem;
        left: 2rem;
    }
    &__close {
        position: absolute;
        right: 1rem;
        top: 1rem;
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

.vc-text-base {
    font-size: 13px !important;
    font-family: "Open Sans", sans-serif !important;
    color: #000000;
}

</style>
