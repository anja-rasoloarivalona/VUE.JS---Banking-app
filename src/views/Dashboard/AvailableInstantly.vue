<template>
    <div class="available">
        <h2 class="dashboard__section__title">Available now</h2>
        <div class="available__value">
            <strong>${{available | amount}}</strong>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      available: 0
    }
  },
  watch: {
    '$store.state.user.wallets': {
      handler: 'setAvailable',
      immediate: true
    }
  },
  methods: {
    setAvailable () {
      let available = 0
      const creditCard = ['Visa', 'MasterCard']
      this.$store.state.user.wallets.forEach(wallet => {
        if (!creditCard.includes(wallet.walletType)) {
          available += wallet.amount
        } else {
          const creditAvailable = wallet.creditLimit - wallet.amount
          available += creditAvailable
        }
      })
      this.available = available
    }
  }
}
</script>

<style lang="scss" scoped>
.available {
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
