<template>
    <div class="income" :class="{xl: large}" :style="{background: income.color}">
      <div class="income__text">
        <h3 class="income__text__name">{{income.name}}</h3>
        <div class="income__text__date">next payout: {{income.nextPayout | short-date}}</div>
      </div>
      <div class="income__value">${{income.amount | amount }}</div>
    </div>
</template>

<script>
export default {
  props: {
    income: {
      type: Object,
      required: true
    },
    large: Boolean
  }
}
</script>

<style lang="scss" scoped>
.income {
    width: 25rem;
    height: 10rem;
    display: flex;
    border-radius: .5rem;
    padding: 1rem;
    background: $color-secondary;
    color: $color-white;
    cursor: pointer;
    &__text {
      // background: red;
      width: 50%;
    }
    &__value {
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
      & .income {
        &__text {
          &__name {
            font-size: 3rem;
            margin-bottom: .8rem;
          }
          &__date {
            font-size: 1.3rem;
          }
        }
        &__value {
          font-size: 3rem;
          font-weight: 600;
        }
      }
    }
}
</style>
