<template>
    <div class="expense">
        <div>{{expense.name}}</div>
        <div>${{expense.amount | amount }}</div>
        <div>{{expense.category}}</div>
        <div v-if="expense.expenseType === 'fixed'">next payout: {{expense.nextPayout | short-date}}</div>
    </div>
</template>

<script>
export default {
  props: {
    expense: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.expense {
    width: 30rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    padding: 1rem;
    background: $color-secondary;
    color: $color-white;
    margin-bottom: 2rem;
    & div {
        margin: 1rem;
    }
}
</style>
