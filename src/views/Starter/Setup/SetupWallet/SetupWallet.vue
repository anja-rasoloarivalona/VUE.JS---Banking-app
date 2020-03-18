<template>
    <div>
        <ul class="setup__walletList" v-if="!showForm">
            <li class="setup__walletList__item">
                <div class="setup__walletList__add" @click="showForm = true">
                    <app-icon name="add" size="extra-large" color="grey"/>
                </div>
            </li>
            <li v-for="(wallet, index) in this.$store.state.wallets"
                :key="index"
                class="setup__walletList__item">
              <app-wallet :wallet="wallet" @click.native="passEditWalletData(wallet)"></app-wallet>
            </li>
        </ul>
        <wallet-form v-else @hideForm="hideForm" :editedWallet="editedWallet"/>
        <app-btn normal primary @click.native="next" v-if="!showForm" :disabled="this.$store.state.wallets < 1">
                Next
        </app-btn>
    </div>
</template>

<script>
import Wallet from '@/components/UI/Wallet'
import WalletForm from './WalletForm'
export default {
  data () {
    return {
      showForm: false,
      editedWallet: null
    }
  },
  components: {
    'wallet-form': WalletForm,
    'app-wallet': Wallet
  },
  methods: {
    passEditWalletData (wallet) {
      this.editedWallet = wallet
      this.showForm = true
    },
    hideForm () {
      this.showForm = false
      this.editedWallet = null
    },
    next () {
      this.$emit('startSetupIncome')
    }
  }
}
</script>

<style lang="scss" scoped>
.setup {
    &__walletList {
        list-style: none;
        margin: 4rem 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, 25rem);
        grid-template-rows: 11rem;
        grid-auto-rows: 11rem;
        column-gap: 2rem;
        row-gap: 2rem;
        &__item {
            width: 25rem;
            height: 11rem;
        }
        &__add {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 25rem;
                height: 11rem;
                border: 1px dashed $color-grey--dark;
                border-radius: 1rem;
                padding: 1rem;
        }
    }
}
</style>
