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
// title 30 + padding 30 + margin 10 = 70
</script>

<style lang="scss" scoped>
.wallet {
    background: $color-white;
    padding: 1.5rem;
    width: 100%;
    & h2 {
        margin-bottom: 1rem;
    }
    &__list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
