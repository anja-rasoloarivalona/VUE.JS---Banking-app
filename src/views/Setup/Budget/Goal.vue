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
              <b>{{$t('setGoal')}}</b>
      </div>
      <div class="setup__view__content__text" :style="{marginTop: 0, marginBottom: '2rem'}">
            <div v-if="isMonthlySavingsPositive">{{$t('basedOnYourIncomeAndExpenses')}}<span class="setup-goal__amount"> {{ userBudgetPlan.monthlySavings | amount }}</span> {{$t('permonth')}}</div>
            <div>{{$t('howMuchDoYouNeedToAchieveYourNextGoal')}}?</div>
      </div>
      <form>
          <app-basic-input v-model="goal"  :id="$t('amount')"/>
      </form>
      <div class="setup-goal__result" v-if="result">
          <div>{{$t('youWillReachYourGoalOn')}}</div>
          <div class="setup-goal__result__value">{{ displayedResult }}</div>
      </div>
      <div class="setup__view__content__cta">
          <template v-if="isMonthlySavingsPositive && !result">
               <app-btn normal secondary>{{$t('later')}}</app-btn>
              <app-btn normal primary @click.native="goalSimulator">
                  {{$t('simulate')}}
              </app-btn>
          </template>
          <app-btn normal primary v-else-if="isMonthlySavingsPositive" @click.native="completeSetup">
              {{$t('save')}}
          </app-btn>
          <template v-else>
            <app-btn normal secondary @click.native="finishSetup">
              {{$t('skip')}}
            </app-btn>
            <app-btn normal primary @click.native="completeSetup">
              {{$t('save')}}
            </app-btn>
          </template>
      </div>

    </div>
</template>

<script>
import axios from 'axios'
import { dateRangeCalculator } from '@/utilities/date-range-calculator.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
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
    displayedResult () {
      return this.result.toString().split(' ').splice(0, 4).join(' ')
    },
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
  watch: {
    goal: function (next, prev) {
      if (next !== prev && this.result) {
        this.result = null
      }
    }
  },
  mounted () {
    if (this.userBudgetPlan.monthlySavings > 0) {
      this.isMonthlySavingsPositive = true
    }
  },
  methods: {
    ...mapMutations([
      'setAppStatus',
      'addGoal'
    ]),
    ...mapActions([
      'finishSetup'
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
        // console.log(err.repsonse)
      }
    },
    completeSetup: async function () {
      try {
        await this.saveGoal()
        await this.finishSetup()
      } catch (err) {
        // console.log(err.response)
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
  &__result {
    margin-top: 3rem;
    font-size: $font-s;
    background: var(--mainColor--light);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    padding: 2rem 0;
    border-radius: 1rem;
    color: var(--textColor--dark);
    &__value {
      color: var(--mainColor);
      font-size: $font-m;
      font-weight: bold;
      margin-top: .5rem;
    }
  }

}

</style>
