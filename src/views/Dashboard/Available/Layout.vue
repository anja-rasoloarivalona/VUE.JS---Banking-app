<template>
    <div class="available dashboard__section">
        <h2 class="dashboard__section__title">{{$t('availableNow')}}</h2>
        <div class="available__value">
            <strong v-if="!ghost">{{available | amount}}</strong>
            <strong v-else>$***</strong>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      available: 0
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  watch: {
    'user.wallets': {
      handler: 'setAvailable',
      immediate: true
    }
  },
  methods: {
    setAvailable () {
      let available = 0
      this.user.wallets.forEach(wallet => {
        if (wallet.walletType === 'Credit card') {
          const creditAvailable = wallet.creditLimit - wallet.amount
          available += creditAvailable
        } else {
          available += wallet.amount
        }
      })

      this.available = available
    }
  },
  props: {
    ghost: Boolean
  }
}
</script>

<style lang="scss" scoped>
.available {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-left: 3rem;
    &__value {
      height: 5rem;
      font-size: 2.4rem;
      color: var(--mainColor);
    }
}
</style>
