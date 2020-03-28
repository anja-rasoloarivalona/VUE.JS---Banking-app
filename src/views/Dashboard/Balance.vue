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
    '$store.state.user.wallets': {
      handler: 'setBalanceAmount',
      immediate: true
    }
  },
  methods: {
    setBalanceAmount () {
      let balance = 0
      const creditCard = ['Visa', 'MasterCard']
      this.$store.state.user.wallets.forEach(wallet => {
        if (!creditCard.includes(wallet.walletType)) {
          balance += wallet.amount
        } else {
          balance -= wallet.amount
        }
      })
      this.balance = balance
      this.$store.commit('initBalance', balance)
    }
  }
}
// Total height = title 5rem + value 5rem = 10rem
</script>

<style lang="scss" scoped>
.balance {
    background: $color-white;
    // border-radius: 1rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-left: 3rem;
    width: 100%;
    & h2 {
        margin-bottom: 1rem;
    }
    &__value {
      height: 5rem;
      font-size: 2.4rem;
      color: $color-primary;
    }
}
</style>
