<template>
    <div class="balance">
        <h2 class="dashboard__section__title">Balance</h2>
        <div class="balance__value">
            <strong>${{balance | amount}}</strong>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      balance: 0
    }
  },
  watch: {
    '$store.state.wallets': {
      handler: 'setBalanceAmount',
      immediate: true
    }
  },
  methods: {
    setBalanceAmount () {
      this.$store.state.wallets.forEach(wallet => {
        this.balance += wallet.amount
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.balance {
    padding: 2rem;
    background: $color-white;
    border-radius: 1rem;
    &__value {
      font-size: 2.4rem;
      color: $color-primary;
    }
}
</style>
