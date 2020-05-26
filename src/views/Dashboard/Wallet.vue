<template>
    <div class="wallet dashboard__section">
        <h2 class="dashboard__section__title">Wallet</h2>
        <ul class="wallet__list">
            <app-wallet v-for="wallet in wallets" :key="wallet._id" :wallet="wallet"></app-wallet>
            <li class="wallet__list__item" @mouseenter="addIconColor = 'primary'" @mouseleave="addIconColor = 'grey--dark'" @click="openBackdrop('wallet')">
                <div class="wallet__list__item--add" @click="showForm = true">
                    <app-icon name="add" size="extra-large" :color="addIconColor"/>
                </div>
              </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Wallet from '@/components/UI/Wallet'
export default {
  data () {
    return {
      wallets: [],
      addIconColor: 'grey--dark'
    }
  },
  watch: {
    '$store.state.user.wallets': {
      handler: 'setWallets',
      immediate: true
    }
  },
  methods: {
    ...mapMutations([
      'openBackdrop'
    ]),
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
    &__list {
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style: none;
        &__item {
          width: 25rem;
          height: 12rem;
              &--add {
                  cursor: pointer;
                  margin: 1rem 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 25rem;
                  height: 12rem;
                  border: 1px dashed rgb(187, 187, 187);
                  border-radius: 1rem;
                  padding: 1rem;
                  &:hover {
                    border: 1px dashed var(--mainColor);
                  }
              }
        }
    }
}
</style>
