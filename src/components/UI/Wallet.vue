<template>
  <div class="wallet" :class="{xl:large}" :style="{background: wallet.color}" v-bind="$attrs">
    <header class="wallet__header">
      <div class="wallet__header__type">{{wallet.walletType}}</div>
      <div class="wallet__header__supplier">{{wallet.supplier}}</div>
    </header>
    <div class="wallet__amount">${{wallet.amount | amount }}</div>
    <div class="wallet__id" v-if="wallet.shortId">
      <span>*  *  *  *</span>
      <span>*  *  *  *</span>
      <span>*  *  *  *</span>
      <span>{{wallet.shortId}}</span>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  props: {
    wallet: Object,
    large: Boolean
  }
}
</script>

<style lang="scss" scoped>
.wallet {
    min-width: 25rem;
    max-width: 25rem;
    height: 12rem;
    margin: 1rem 0;
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
      & .wallet {
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
