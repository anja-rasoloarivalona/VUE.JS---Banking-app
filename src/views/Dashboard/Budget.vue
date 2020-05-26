<template>
  <div class="budget dashboard__section">
    <h2 class="dashboard__section__title">Budget</h2>
    <div class="budget__empty" v-if="variableBudgetCounter === 0">
      You do not have variable expenses.<div @click="openBackdrop('expense')">Click here</div>to add a new one.
    </div>
    <div v-else v-for="item in budget" :key="item._id" class="budget__item">
        <h3 class="budget__item__key">{{ item.name }}</h3>
        <div class="budget__item__barContainer">
          <div class="budget__item__bar" :style="{ width:  item.amount / max * 100 + '%' }">
              <div class="budget__item__usedbar" :style="{width: item.used * oneDollarWidth + 'vw', background: item.color}">
                  ${{ item.used | amount }}
              </div>
          </div>
        </div>
        <div class="budget__item__max">${{ item.amount | amount }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      budget: [],
      variableBudgetCounter: 0
    }
  },
  watch: {
    'user.expenses': {
      handler: 'setBudget',
      immediate: true
    }
  },
  methods: {
    ...mapMutations([
      'openBackdrop'
    ]),
    setBudget () {
      this.user.expenses.forEach(expense => {
        if (expense.expenseType === 'variable') {
          this.variableBudgetCounter++
          this.budget.push({
            _id: expense._id,
            name: expense.name,
            amount: expense.amount,
            used: expense.used,
            color: expense.color
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
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
    padding: 1rem;
    padding-left: 3rem;
    margin: 0;
    display: flex;
    flex-direction: column;
    // overflow: hidden;
    &__item {
    display: flex;
    align-items: center;
    height: 6rem;
        &__key {
            width: 10rem;
            min-width: 10rem;
            text-transform: capitalize;
            color: var(--textColor--dark);
        }
        &__barContainer {
          height: 2rem;
          width: 34vw;
          background: transparent
        }
        &__bar {
            height: 100%;
            max-width: 100%;
            background: var(--on-surfaceColor);
            position: relative;
            border-radius: .5rem;
            overflow: hidden;
        }
        &__usedbar {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            display: flex;
            align-items: center;
            padding-left: 2rem;
            color: $color-white;
            border-radius: .5rem;
        }
        &__max {
            margin-left: 2rem;
            color: var(--textColor)
        }
    }
    &__empty {
      // background: red;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $font-s;
      & div {
        margin: 0 .35rem;
        cursor: pointer;
        color: var(--mainColor);
        &:hover {
          text-decoration: underline;
        }
      }
    }
}
</style>
