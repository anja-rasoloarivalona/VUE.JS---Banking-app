<template>
    <div class="wallets" v-if="!showForm">
        <app-btn normal primary @click.native="showForm = true">
                New wallet
        </app-btn>
        <ul class="wallets__list">
            <app-wallet
                v-for="wallet in wallets"
                :key="wallet._id"
                :wallet="wallet"
                @click.native="passEditWalletData(wallet)"
            >
            </app-wallet>
        </ul>
    </div>
    <wallet-form
        v-else
        @hideForm="showForm = false"
        :editedWallet="editedWallet"
    >
    </wallet-form>
</template>

<script>
import Wallet from '@/components/UI/Wallet'
import WalletForm from '@/components/Forms/WalletForm'
export default {
  data () {
    return {
      wallets: [],
      showForm: false,
      editedWallet: null
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
    },
    passEditWalletData (wallet) {
      this.editedWallet = wallet
      this.showForm = true
    }
  },
  components: {
    'app-wallet': Wallet,
    'wallet-form': WalletForm
  }
}
</script>

<style lang="scss" scoped>
.wallets {
  width: 100%;
  max-width: 120rem;
    & button {
        margin-bottom: 3rem;
    }
}
</style>
