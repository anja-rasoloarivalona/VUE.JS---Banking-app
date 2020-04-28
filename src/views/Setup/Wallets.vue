<template>
    <div class="setup__view__content" :class="{left: currentSetupStep !== 'wallets'}">
        <div class="setup__view__content__main" :class="{expand: user.wallets.length > 0}">
            <h1 class="setup__view__content__main__title">Wallets</h1>
            <div class="setup__view__content__main__details" v-if="user.wallets.length < 1">To begin, let's setup your wallets.</div>
            <ul class="setup__view__content__main__list" v-else-if="!showForm">
                <li class="setup__view__content__main__list__item">
                    <div class="setup__view__content__main__list__item--add" @click="showForm = true">
                        <app-icon name="add" size="extra-large" color="grey"/>
                    </div>
                </li>
                <li v-for="(wallet, index) in user.wallets"
                    :key="index"
                    class="setup__view__content__main__list__item">
                    <app-wallet :wallet="wallet" @click.native="passEditWalletData(wallet)"></app-wallet>
                </li>
            </ul>
            <div class="setup__view__content__form active" v-else>
                <wallet-form  @hideForm="hideForm" :editedWallet="editedWallet" :isCancelBtnDisplayed="true"/>
            </div>
            <div class="setup__view__content__main__cta" v-if="!showForm && user.wallets.length > 0">
                <app-btn normal primary @click.native="setCurrentSetupStep('incomes')">Next</app-btn>
            </div>
        </div>
        <div class="setup__view__content__form" v-if="user.wallets.length < 1">
            <wallet-form  @hideForm="hideForm" :editedWallet="editedWallet"/>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Wallet from '@/components/UI/Wallet'
import WalletForm from '@/components/Forms/WalletForm'
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
  computed: {
    ...mapGetters([
      'user',
      'currentSetupStep'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentSetupStep'
    ]),
    passEditWalletData (wallet) {
      this.editedWallet = wallet
      this.showForm = true
    },
    hideForm () {
      this.showForm = false
      this.editedWallet = null
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
