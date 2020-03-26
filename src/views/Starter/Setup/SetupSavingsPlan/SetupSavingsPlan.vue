<template>
    <div class="savings">
        <div class="savings__section">
            <h3 class="savings__section__title">Your income</h3>
            <ul class="savings__section__list" v-for="income in this.$store.state.user.incomes" :key="income._id">
                <li class="savings__section__list__item">
                    <div>{{income.name}}</div>
                    <div>${{income.amount | amount}}</div>
                    <div>{{income.nextPayout | short-date}}</div>
                </li>
            </ul>
        </div>
        <div class="savings__section">
            <h3 class="savings__section__title">Your expense</h3>
            <ul class="savings__section__list" v-for="expense in this.$store.state.user.expenses" :key="expense._id">
                <li class="savings__section__list__item">
                    <div>{{expense.name}}</div>
                    <div>${{expense.amount | amount}}</div>
                    <div v-if="expense.expenseType === 'fixed'">{{expense.nextPayout | short-date}}</div>
                </li>
            </ul>

        </div>
        <div class="savings__cta">
            <div class="savings__cta__input" v-if="!goalAdded">
                <app-basic-input v-model="goal.name" :id="'name'" bgWhite/>
                <app-basic-input v-model="goal.amount" :id="'goal'" bgWhite/>
                <div class="savings__cta__result" v-if="result">
                  <div>You will achieve your goal the : </div>
                  <div>{{result | short-date}}</div>
                </div>
                <div class="savings__cta__btns">
                  <app-btn normal secondary @click.native="goalSimulator">Simulate</app-btn>
                  <app-btn normal primary @click.native="addGoal" :disabled="!result || goal.name === ''">Add</app-btn>
                </div>
            </div>
            <div class="savings__cta__goalAdded" v-if="goalAdded">
                <div>Congratulations ! You are now ready to take control of your finance</div>
                <app-btn normal primary @click.native="launchApp">Start</app-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { dateRangeCalculator } from '@/utilities/date-range-calculator.js'
export default {
  data () {
    return {
      goal: {
        name: '',
        amount: 0
      },
      result: null,
      goalAdded: false
    }
  },
  methods: {
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
      const goal = this.goal.amount
      let sumTotal = 0

      // Determine the total amount of money available to the user now.
      this.$store.state.user.wallets.forEach(wallet => {
        sumTotal += wallet.amount
      })

      // Prepare incomes data for the simulation
      this.$store.state.user.incomes.forEach(income => {
        transactionsData.push({
          amount: income.amount,
          nextPayout: new Date(income.nextPayout),
          frequency: income.frequency
        })
      })

      // Prepare expenses data for the simulation
      this.$store.state.user.expenses.forEach(expense => {
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
      while (sumTotal < goal) {
        const currentTransaction = transactionsData[0]
        sumTotal += currentTransaction.amount
        if (sumTotal > goal) {
          result = currentTransaction.nextPayout
        }
        currentTransaction.nextPayout = dateRangeCalculator(currentTransaction.frequency, currentTransaction.nextPayout)
        transactionsData.sort((a, b) => {
          return new Date(a.nextPayout) - new Date(b.nextPayout)
        })
      }
      this.result = result
    },
    addGoal: async function () {
      const graphqlQuery = {
        query: `mutation {
              addGoal(goalInput: {
                name: "${this.goal.name}",
                amount: "${this.goal.amount}",
                date: "${this.result}"
              }) {
                name
                amount
                date
              }
        }`
      }
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.addGoal
        this.goalAdded = true
        this.$store.commit('addGoal', responseData)
        this.$store.commit('setUserStatus', 'active')
        console.log(responseData)
      } catch (err) {
        console.log(err)
      }
    },
    launchApp () {
      this.$store.commit('setAppStatus', 'running')
    }
  }
}
</script>

<style lang="scss" scoped>
.savings {
    &__section {
        margin: 2rem 0;
        &__title {
            color: $color-grey--main;
            font-size: $font-m;
            margin-bottom: 1rem;
        }
        &__list {
            list-style: none;
            font-size: $font-m;
            &__item {
                display: flex;
                align-items: center;
                margin-bottom: 1rem;
                & div {
                    width: 14rem;
                }
            }
        }
    }
    &__cta {
        display: flex;
        align-items: center;
        margin-top: 5rem;
        &__input {
            background: $color-grey--light;
            width: 30rem;
            padding: 1.5rem;
            border-radius: .5rem;
        }
        &__result {
          background: $color-white;
          color: $color-primary;
          display: flex;
          flex-direction: column;
          text-align: center;
          border-radius: .5rem;
          padding: 2rem;
          font-size: $font-m;
          margin-bottom: 2rem;
          & div:first-child {
            margin-right: 1rem;
          }
        }
        &__btns {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        &__goalAdded {
          & div {
            font-size: $font-m;
            margin-bottom: 2rem;
          }
        }
    }

}
</style>
