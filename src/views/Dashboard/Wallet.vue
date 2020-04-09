<template>
    <div class="wallet dashboard__section">
        <h2 class="dashboard__section__title">Wallet</h2>
        <ul class="wallet__list">
            <app-wallet v-for="wallet in wallets" :key="wallet._id" :wallet="wallet"></app-wallet>
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
    '$store.state.user.wallets': {
      handler: 'setWallets',
      immediate: true
    }
  },
  methods: {
    setWallets () {
      this.wallets = this.$store.state.user.wallets
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
    width: 100%;
    & h2 {
        margin-bottom: 1rem;
        padding-left: 1.5rem;
    }
    &__list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
