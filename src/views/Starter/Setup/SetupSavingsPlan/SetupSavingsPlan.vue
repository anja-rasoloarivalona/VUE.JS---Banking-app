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
                <div> {{result}}</div>
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
    findNextMonth (d) {
    //   const d = new Date(date)
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

      // const goal = this.goal.amount

      // Current total savings
      let sumTotal = 0
      this.$store.state.wallets.forEach(wallet => {
        sumTotal += wallet.amount
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
            amount: expense.amount,
            nextPayout: new Date(expense.nextPayout),
            frequency: expense.frequency
          })
        }
      })
      console.log('sunmTotal', sumTotal, transactionsData)
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
