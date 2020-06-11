<template>
    <div
        class="setup__view__content setup-goal"
        :class="{
          right: setup.currentSetupStep !== 'goal'
      }"
    >
      <div class="setup__view__content__imgContainer">
          <app-icon name="goal" size="xxl" />
      </div>
      <div class="setup__view__content__title">
              <b>Set goal</b>
      </div>
      <div class="setup__view__content__text" :style="{marginTop: 0, marginBottom: '2rem'}">
            <div>Based on your income and expenses, you can save an average of<span class="setup-goal__amount"> {{ userBudgetPlan.monthlySavings | amount }}</span> per month</div>
            <div>How much do you need to achieve your next goal?</div>
      </div>
      <form>
          <app-basic-input v-model="goal"  id="Amount"/>
      </form>
      <div class="setup__view__content__cta">
          <template v-if="isMonthlySavingsPositive">
               <app-btn normal secondary>Later</app-btn>
              <app-btn normal primary @click.native="goalSimulator">
                  Simulate
              </app-btn>
          </template>
          <template v-else>
              <app-btn normal primary>
                  Got it
              </app-btn>
          </template>

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
      isSettingGoal: false,
      isMonthlySavingsPositive: false,
      goal: 0,
      result: null
    }
  },
  computed: {
    ...mapGetters([
      'setup',
      'user',
      'frequencyOptions'
    ]),
    userBudgetPlan () {
      let monthlyIncomes = 0
      let monthlyExpenses = 0

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
  mounted () {
    if (this.userBudgetPlan.monthlySavings > 0) {
      this.isMonthlySavingsPositive = true
    }
    console.log('user income', this.user.incomes)
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
        if (expense.expenseType === 'Variable') {
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
      console.log('goal date', this.result)
    },
    saveGoal: async function () {
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
        this.addGoal(resData)
      } catch (err) {
        console.log(err.repsonse)
      }
    },
    completeSetup: async function () {
      try {
        await this.saveGoal()
        this.$emit('setup-completed')
      } catch (err) {
        console.log(err.response)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.setup-goal {
  width: 60%;
  max-width: 60rem;
  padding-bottom: 4rem;
  &__amount {
  color: var(--mainColor);
  margin: 0 .3rem;
}

}

</style>
