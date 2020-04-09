<template>
  <!-- <div class="wallet" :class="{xl:large}" :style="{background: wallet.color}" v-bind="$attrs"> -->
  <div class="wallet" :class="{xl:large}" v-bind="$attrs">
    <div class="wallet__chip">
      <div class="wallet__chip__content">
        <div
          v-for="(point, i) in chipPoints"
          :key='i'
          class="wallet__chip__content__point"
          :class="{dot: point === 'x'}"
        >
        </div>
      </div>
    </div>
    <div class="wallet__supplier">{{wallet.supplier}}</div>
    <div class="wallet__amount">${{wallet.amount | amount }}</div>
    <div class="wallet__type">{{wallet.walletType}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chipPoints: [
        ' ', 'x', ' ', ' ', ' ', 'x', ' ',
        ' ', 'x', 'x', 'x', 'x', 'x', 'x',
        ' ', ' ', ' ', 'x', 'x', 'x', ' ',
        ' ', 'x', 'x', 'x', 'x', 'x', ' ',
        ' ', 'x', 'x', 'x', 'x', ' ', ' '
      ]
    }
  },
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
    padding: 1.5rem;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    box-shadow:  3px 3px 7px #191919, -3px -3px 7px #212121;
    background: var( --app-line-color);
    cursor: pointer;
    &__chip  {
      &__content {
        border-radius: .5rem;
        width: 3rem;
        height: 2rem;
        background: var( --app-line-color);
        background-image: linear-gradient(to bottom right, rgb(28, 28, 28), rgb(56, 56, 56));
        box-shadow: 3px 2px 2px rgba(8, 8, 8, 0.2) inset, -1px -1px 3px rgba(109, 109, 109, 0.05) inset;
        display: grid;
        grid-template-columns: repeat(7,1fr);
        grid-template-rows: repeat(5, 1fr);
        align-items: center;
        justify-items: center;
        padding: 2px;
        &__point {
          width: 1px;
          height: 1px;
          &.dot {
            background: rgb(131, 131, 131);
          }
        }
      }
    }
    &__supplier {
      // background: blue;
      display: flex;
      justify-content: flex-end;
      color: var(--app-text-color);
      font-size: $font-s;
    }
    &__type {
      // background: yellow;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      color: var(--app-title-color-secondary);
      font-size: $font-s;
    }
    &__amount {
      // background: orangered;
      display: flex;
      align-items: flex-end;
      font-size: $font-m;
      color: var(--app-color-main)
    }
    &.xl {
      min-width: 40rem;
      max-width: 40rem;
      height: 20rem;
      // padding: 3rem;
    }
}
</style>
