<template>
    <div class="setup__view">
        <h2 class="setup__view__title">Wallet</h2>
        <br>
        <p class="setup__view__desc">Let's begin with your wallet. Here you can provide information about all the different methods you use to make a transaction.</p>
        <p class="setup__view__desc">For example, you can enter your debit card, your credit card or your wallet to store cash.</p>
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
import Wallet from '@/components/Wallet'
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
      this.$emit('startSetupBudget')
    }
  }
}
</script>

<style lang="scss" scoped>
.setup {
    &__view {
        &__title {
            font-size: 3.5rem;
            color: $color-grey--dark;
        }
        &__desc {
            font-size: $font-m;
            line-height: 1.4;
        }
    }
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
