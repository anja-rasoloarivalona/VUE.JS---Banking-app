<template>
  <div class="budget">
    <h2 class="color-grey-main">Budget</h2>
    <div v-for="item in budget" :key="item._id" class="budget__item">
        <div class="budget__item__key">{{ item.name }}</div>
        <div class="budget__item__maxbar" :style="{ width:  item.amount / max * 100 + '%' }">
            <div class="budget__item__usedbar" :style="{width: item.used * oneDollarWidth + 'em'}">
                ${{ item.used | amount }}
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
      budget: []
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
      this.$store.state.expenses.forEach(expense => {
        if (expense.expenseType === 'variable') {
          this.budget.push({
            _id: expense._id,
            name: expense.name,
            amount: expense.amount,
            used: expense.used
          })
        }
      })
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
      const oneDollarWidth = 100 / max
      return oneDollarWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.budget {
    background: $color-white;
    padding: 1.5rem;
    border-radius: 2rem;
    &__item {
    display: flex;
    align-items: center;
    margin: 3rem 0;
    background: red;
        &__key {
            width: 10rem;
            min-width: 10rem;
            text-transform: capitalize;
            font-size: $font-s;
            color: $color-grey--dark;
            background: green;
        }
        &__maxbar {
            height: 2rem;
            max-width: 100%;
            background: $color-grey--main;
            position: relative;
            border-radius: .5rem;
            overflow: hidden;
        }
        &__usedbar {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: $color-primary;
            display: flex;
            align-items: center;
            padding-left: 2rem;
            color: $color-white;
        }
        &__max {
            margin-left: 2rem;
            color: $color-primary
        }
    }
}
</style>
