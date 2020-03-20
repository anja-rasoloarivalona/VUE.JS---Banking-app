<template>
    <div class="savings">
        <div class="savings__section">
            <h3 class="savings__section__title">Your income</h3>
            <ul class="savings__section__list" v-for="income in this.$store.state.incomes" :key="income._id">
                <li class="savings__section__list__item">
                    <div>{{income.name}}</div>
                    <div>${{income.amount | amount}}</div>
                    <div>{{income.nextPayout | short-date}}</div>
                </li>
            </ul>
        </div>
        <div class="savings__section">
            <h3 class="savings__section__title">Your expense</h3>
            <ul class="savings__section__list" v-for="expense in this.$store.state.expenses" :key="expense._id">
                <li class="savings__section__list__item">
                    <div>{{expense.name}}</div>
                    <div>${{expense.amount | amount}}</div>
                    <div v-if="expense.expenseType === 'fixed'">{{expense.nextPayout | short-date}}</div>
                </li>
            </ul>

        </div>
        <div class="savings__cta">
            <div class="savings__cta__input">
                <app-basic-input v-model="goal.name" :id="'name'" bgWhite/>
                <app-basic-input v-model="goal.amount" :id="'amount'" bgWhite/>
                <app-btn normal primary @click.native="goalSimulator">Simulate</app-btn>
            </div>
            <div class="savings__cta__result">
                <div>You will achieve your goal the: </div>
                <div> {{result | short-date}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      goal: {
        name: '',
        amount: 0
      },
      result: ''
    }
  },
  methods: {
    dateRangeCalculator (frequency, previousDate) {
      const dayLength = 24 * 60 * 60 * 1000
      const prev = new Date(previousDate)
      const prevMonth = prev.getMonth()
      const prevYear = prev.getFullYear()
      let nbDaysBeforeNextDate
      const counterData = { once: 1, twice: 2, 'three times': 3, 'four times': 4, 'five times': 5, 'six times': 6 }
      const periodData = { 'a day': 1, 'a week': 7, 'every two weeks': 14, 'a month': 30, 'a year': prevYear % 400 === 0 || (prevYear % 100 !== 0 && prevYear % 4 === 0) ? 366 : 365 }
      if (frequency.period === 'a month') {
        nbDaysBeforeNextDate = new Date(prevYear, prevMonth + 1, 0).getDate()
      } else {
        const counter = counterData[frequency.counter]
        const period = periodData[frequency.period]
        nbDaysBeforeNextDate = Math.ceil(period / counter)
      }
      const nextDate = new Date(prev.getTime() + nbDaysBeforeNextDate * dayLength)
      return nextDate
    },
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
      const transactionsData = []
      const goal = this.goal.amount

      // Current total savings
      let sumTotal = 0
      this.$store.state.wallets.forEach(wallet => {
        sumTotal += wallet.amount
      })

      this.$store.state.incomes.forEach(income => {
        transactionsData.push({
          amount: income.amount,
          nextPayout: new Date(income.nextPayout),
          frequency: income.frequency
        })
      })

      this.$store.state.expenses.forEach(expense => {
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

      transactionsData.sort((a, b) => {
        return new Date(a.nextPayout) - new Date(b.nextPayout)
      })

      let result

      while (sumTotal < goal) {
        const currentTransaction = transactionsData[0]
        sumTotal += currentTransaction.amount
        if (sumTotal > goal) {
          result = currentTransaction.nextPayout
        }
        currentTransaction.nextPayout = this.dateRangeCalculator(currentTransaction.frequency, currentTransaction.nextPayout)
        transactionsData.sort((a, b) => {
          return new Date(a.nextPayout) - new Date(b.nextPayout)
        })
      }
      this.result = result
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
        &__input {
            margin-top: 5rem;
            background: $color-grey--light;
            width: 25rem;
            padding: 1.5rem;
            border-radius: .5rem;
            margin-right: 2rem;
        }
    }

}
</style>
