<template>
  <div class="budget dashboard__section">
    <h2 class="dashboard__section__title">Budget</h2>
    <div v-for="item in budget" :key="item._id" class="budget__item">
        <h3 class="budget__item__key">{{ item.name }}</h3>
        <div class="budget__item__barContainer">
          <div class="budget__item__bar" :style="{ width:  item.amount / max * 100 + '%' }">
              <div class="budget__item__usedbar" :style="{width: item.used * oneDollarWidth + 'vw'}">
                  ${{ item.used | amount }}
              </div>
          </div>
        </div>
        <div class="budget__item__max">${{ item.amount | amount }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      budget: [],
      variableBudgetCounter: 0
    }
  },
  watch: {
    '$store.state.expenses': {
      handler: 'setBudget',
      immediate: true
    }
  },
  methods: {
    setBudget () {
      let variableBudgetCounter = 0
      this.$store.state.user.expenses.forEach(expense => {
        if (expense.expenseType === 'variable') {
          variableBudgetCounter++
          this.budget.push({
            _id: expense._id,
            name: expense.name,
            amount: expense.amount,
            used: expense.used
          })
        }
      })
      this.variableBudgetCounter = variableBudgetCounter
    }
  },
  computed: {
    max () {
      let max = 0
      this.budget.forEach(item => {
        if (item.amount > max) {
          max = item.amount
        }
      })
      return max
    },
    oneDollarWidth () {
      let max = 0
      this.budget.forEach(item => {
        if (item.amount > max) {
          max = item.amount
        }
      })
      const oneDollarWidth = 34 / max
      return oneDollarWidth
    }
  }
}
// Total height = 50 + (nb item * 60)
// one item : 110
// two items : 170
// three items: 230
// four items: 290

// solution : itemHeight = itemHeight + (    (NbItems -1 * 10) / NbItems    )
</script>

<style lang="scss" scoped>
.budget {
    width: 100%;
    padding: 1rem;
    padding-left: 3rem;
    // border-radius: 2rem;
    margin: 0;
    &__item {
    display: flex;
    align-items: center;
    height: 6rem;
        &__key {
            width: 10rem;
            min-width: 10rem;
            text-transform: capitalize;
            color: var(--app-title-color-secondary);
        }
        &__barContainer {
          height: 2rem;
          width: 34vw;
          background: transparent
        }
        &__bar {
            height: 100%;
            max-width: 100%;
            background: var( --app-line-color);
            position: relative;
            border-radius: .5rem;
            overflow: hidden;
        }
        &__usedbar {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: var(--app-color-main);
            display: flex;
            align-items: center;
            padding-left: 2rem;
            color: $color-white;
        }
        &__max {
            margin-left: 2rem;
            color: var(--app-text-color)
        }
    }
}
</style>
