<template>
    <div class="income">
        <div>{{income.name}}</div>
        <div>${{income.amount | amount }}</div>
        <div>next payout: {{income.nextPayout | short-date}}</div>
    </div>
</template>

<script>
export default {
  props: {
    income: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.income {
    width: 30rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    padding: 1rem;
    background: $color-secondary;
    color: $color-white;
    & div {
        margin: 1rem;
    }
}
</style>
