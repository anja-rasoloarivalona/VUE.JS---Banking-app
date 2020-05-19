<template>
    <div class="setup__view__content" :class="{right: currentSetupStep !== 'goal'}">
        <div class="setup__view__content__main">
            <h1 class="setup__view__content__main__title">Goal</h1>
            <div class="setup__view__content__main__details">To finish, let's setup your goal. We'll determine the earliest date you can achieve it according to your incomes and expenses data</div>
        </div>
        <div class="setup__goal setup__view__content__form">
            <form class="form">
                <app-basic-input v-model="goal" :id="'How much are you willing to save?'" :disabled="result"/>
                <div class="setup__goal__result" v-if="result">
                    <div class="setup__goal__result__key">Earliest date</div>
                    <div class="setup__goal__result__value">{{ result | short-date }}</div>
                </div>
                <div class="form__cta">
                    <app-btn normal primary @click.native="goalSimulator" v-if="!result">Simulate</app-btn>
                    <template v-else>
                        <app-btn normal warning @click.native="result = null">Change</app-btn>
                        <app-btn normal primary @click.native="completeSetup">Save</app-btn>
                    </template>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { dateRangeCalculator } from '@/utilities/date-range-calculator.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      goal: 0,
      result: null
    }
  },
  computed: {
    ...mapGetters([
      'currentSetupStep',
      'user'
    ])
  },
  methods: {
    ...mapMutations([
      'setAppStatus',
      'addGoal'
    ]),
    findNextMonth (d) {
      const year = d.getFullYear()
      let nextMonth = d.getMonth()
      let result
      if (nextMonth < 11) {
        nextMonth += 2
        result = `${nextMonth}/1/${year}`
      } else {
        result = `1/1/${year + 1}`
      }
      return new Date(result)
    },
    clicked () {
      console.log('clicked')
    },
    goalSimulator () {
      this.result = null
      const transactionsData = []
      let sumTotal = 0
      // Determine the total amount of money available to the user now.
      this.user.wallets.forEach(wallet => {
        sumTotal += wallet.amount
      })
      // Prepare incomes data for the simulation
      this.user.incomes.forEach(income => {
        transactionsData.push({
          amount: income.amount,
          nextPayout: new Date(income.nextPayout),
          frequency: income.frequency
        })
      })
      // Prepare expenses data for the simulation
      this.user.expenses.forEach(expense => {
        if (expense.expenseType === 'variable') {
          const budget = expense.amount
          const used = expense.used
          if (budget > used) {
            sumTotal -= (budget - used)
          }
          transactionsData.push({
            amount: expense.amount * -1,
            nextPayout: this.findNextMonth(new Date()),
            frequency: expense.frequency
          })
        } else {
          transactionsData.push({
            amount: expense.amount * -1,
            nextPayout: new Date(expense.nextPayout),
            frequency: expense.frequency
          })
        }
      })
      // Sort the array : we'll get the earliest transaction at the first index
      transactionsData.sort((a, b) => {
        return new Date(a.nextPayout) - new Date(b.nextPayout)
      })
      // Once the simulation is finished, the result will be stored in this variable
      let result
      // Launch simulation
      while (sumTotal < this.goal) {
        const currentTransaction = transactionsData[0]
        sumTotal += currentTransaction.amount
        console.log(sumTotal)
        if (sumTotal >= this.goal) {
          result = currentTransaction.nextPayout
        } else {
          currentTransaction.nextPayout = dateRangeCalculator(currentTransaction.frequency, currentTransaction.nextPayout)
          transactionsData.sort((a, b) => {
            return new Date(a.nextPayout) - new Date(b.nextPayout)
          })
        }
      }
      this.result = result
    },
    saveGoal: async function () {
      console.log('saving goal')
      const graphqlQuery = {
        query: `mutation {
              addGoal(goalInput: {
                amount: "${this.goal}",
                date: "${this.result}"
              }) {
                amount
                date
              }
        }`
      }
      try {
        const response = await axios.post('/', graphqlQuery)
        const resData = response.data.data.addGoal
        console.log('goal saved', resData)
        this.addGoal(resData)
      } catch (err) {
        console.log(err.repsonse)
      }
    },
    completeSetup: async function () {
      console.log('completing setup')
      try {
        await this.saveGoal()
        console.log('end')
        this.$emit('setup-completed')
      } catch (err) {
        console.log(err.response)
      }
    }
  }
}
</script>

<style lang="scss">
.setup__view__content__form.setup__goal  {
    width: 40rem !important;
    & .form {
        width: 100%;
        &__cta {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
.setup__goal__result {
    font-size: $font-m;
    &__key {
        margin-bottom: .5rem;
        color: var(--mainColor);
    }
    &__value {
        height: 4rem;
        color: var(--textColor--dark);
        border: none;
        padding-left: 1rem;
        border-radius: 0.5rem;
        background: var(--backgroundColor);
        border: 1px solid var(--mainColor);
        display: flex;
        align-items: center;
    }
}
</style>
