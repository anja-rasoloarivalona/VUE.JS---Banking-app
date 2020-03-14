<template>
  <div class="card" :class="{xl:large}" :style="{background: card.color}">
    <header class="card__header">
      <div class="card__header__type">{{card.cardType}}</div>
      <div class="card__header__supplier">{{card.supplier}}</div>
    </header>
    <div class="card__amount">${{card.amount | amount }}</div>
    <div class="card__id" v-if="card.shortId">
      <span>*  *  *  *</span>
      <span>*  *  *  *</span>
      <span>*  *  *  *</span>
      <span>{{card.shortId}}</span>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  props: {
    card: Object,
    large: Boolean
  }
}
</script>

<style lang="scss" scoped>
.card {
    width: 25rem;
    height: 11rem;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 1px 18px -10px rgba(0,0,0,0.75);
    cursor: pointer;
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
        color: $color-grey--main;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    &.xl {
      width: 40rem;
      height: 20rem;
      padding: 3rem;
      & .card {
        &__header {
          &__type {
            font-size: 3rem;
          }
          &__supplier {
            font-size: 2rem;
          }
        }
        &__amount {
          font-size: 3rem;
        }
        &__id {
          font-size: 1.5rem;
          & span:last-child {
            letter-spacing: 6px;
          }
        }
      }
    }
}
</style>
