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
// Total height = title 5rem + value 5rem = 10rem
</script>

<style lang="scss" scoped>
.balance {
    background: $color-white;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-left: 3rem;
    width: 100%;
    &__value {
      height: 5rem;
      font-size: 2.4rem;
      margin-bottom: 1rem;
      color: $color-primary;
    }
}
</style>
