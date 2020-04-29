<template>
    <div class="expense" :class="{xl: large}" :style="{background: expense.color}">
      <div class="expense__details">
        <div class="expense__details__top">
            <h3 class="expense__details__top__name">{{expense.name}}</h3>
            <div class="expense__details__top__date" v-if="expense.expenseType === 'fixed'">next payout: {{expense.nextPayout | short-date}}</div>
        </div>
        <div class="expense__details__bot">
            <div>{{expense.category}}</div>
        </div>
      </div>
      <div class="expense__amount">
          <div>${{expense.amount | amount }}</div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    expense: {
      type: Object,
      required: true
    },
    large: Boolean
  }
}
</script>

<style lang="scss" scoped>
.expense {
    width: 25rem;
    height: 12rem;
    margin: 1rem 0;
    display: flex;
    border-radius: 1rem;
    padding: 1.5rem;
    background: blue;
    color: $color-white;
    cursor: pointer;
    margin-bottom: 2rem;

    &__details {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__amount {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &.xl {
      min-width: 40rem;
      max-width: 40rem;
      height: 20rem;
      padding: 2rem;
      & .expense {
          &__details {
            &__top {
              &__name {
                font-size: 3rem;
                margin-bottom: .8rem;
              }
              &__date {
                font-size: 1.3rem;
              }
            }
            &__bot {
              font-size: 1.3rem;
            }
          }
          &__amount {
            font-size: 3rem;
            font-weight: 600;
          }
      }
    }

}
</style>
