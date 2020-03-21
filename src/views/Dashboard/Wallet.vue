<template>
    <div class="wallet">
        <h2 class="dashboard__section__title">Wallet</h2>
        <ul class="wallet__list">
            <app-wallet v-for="(wallet,index) in wallets" :key="index" :wallet="wallet"></app-wallet>
        </ul>
    </div>
</template>

<script>
import Wallet from '@/components/UI/Wallet'
export default {
  data () {
    return {
      wallets: []
    }
  },
  watch: {
    '$store.state.wallets': {
      handler: 'setWallets',
      immediate: true
    }
  },
  methods: {
    setWallets () {
      this.wallets = this.$store.state.wallets
    }
  },
  components: {
    'app-wallet': Wallet
  }
}
</script>

<style lang="scss" scoped>
.wallet {
    background: $color-white;
    padding: 1.5rem;
    border-radius: 2rem;
    &__list {
        display: grid;
        grid-template-columns: repeat(auto-fit, 25rem);
        grid-template-rows: 12rem;
        grid-auto-rows: 12rem;
        column-gap: 6rem;
        row-gap: 1rem;
        align-items: center;
    }
}
</style>
