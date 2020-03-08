<template>
  <div class="card">
    <header class="card__header">
      <div class="card__header__type">{{card.type}}</div>
      <div class="card__header__supplier">{{card.supplier}}</div>
    </header>
    <div class="card__amount">${{card.amount | amount }}</div>
    <div class="card__id" v-if="card._id">**** **** **** {{card._id}}</div>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object
  }
}
</script>

<style lang="scss" scoped>
.card {
    width: 25rem;
    height: 11rem;
    background: blue;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__header {
        display: flex;
        justify-content: space-between;
        &__type {
            color: $color-white;
            font-size: $font-l;
        }
        &__supplier {
            color: $color-grey--main;
            font-size: $font-m;
        }
    }
    &__amount {
        color: $color-white;
        font-size: $font-xl;
    }
    &__id {
        color: $color-grey--main
    }
}
</style>
