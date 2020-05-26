<template>
    <div class="wallets">
        <ul class="wallets__list">
          <li class="wallets__list__item" @mouseenter="addIconColor = 'primary'" @mouseleave="addIconColor = 'grey--dark'" @click="openBackdrop('wallet')">
                <div class="wallets__list__item--add" @click="showForm = true">
                    <app-icon name="add" size="extra-large" :color="addIconColor"/>
                </div>
            </li>
            <app-wallet
                v-for="wallet in wallets"
                :key="wallet._id"
                :wallet="wallet"
                @click.native="clickWallet(wallet)"
            >
            </app-wallet>
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
      editedWallet: null,
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
      'openBackdrop',
      'setEditedWallet'
    ]),
    clickWallet (wallet) {
      this.setEditedWallet(wallet)
      this.openBackdrop('wallet')
    },
    setWallets () {
      this.wallets = this.$store.state.user.wallets
    },
    passEditWalletData (wallet) {
      this.editedWallet = wallet
      this.showForm = true
    }
  },
  components: {
    'app-wallet': Wallet
  }
}
</script>

<style lang="scss" scoped>
.wallets {
  width: calc(100% - 2rem);
  max-width: 120rem;
  background: var(--surfaceColor);
  border-radius: .5rem;
  margin-bottom: 5rem;
  padding: 3rem;
    &__list {
        display: grid;
        grid-template-columns: repeat(auto-fit, 25rem);
        grid-template-rows: 12rem;
        grid-auto-rows: 12rem;
        column-gap: 2rem;
        row-gap: 2rem;
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
