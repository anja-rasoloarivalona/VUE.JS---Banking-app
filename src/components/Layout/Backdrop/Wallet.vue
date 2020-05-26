<template>
    <div class="wallet" :class="{'bg-white': theme.isLight, 'bg-surfaceColor': theme.isDark}">
        <wallet-form isCancelBtnDisplayed :amountIsDisabled="editedWallet" :typeIsDisabled="editedWallet" :editedWallet="editedWallet">
            <div class="wallet__header">
                <h1 v-text="editedWallet ? 'Edit wallet' : 'Add wallet'">Add wallet</h1>
                <div class="wallet__header__close" @click="closeBackdrop">
                    <app-icon name="close" size="large"/>
                </div>
            </div>
        </wallet-form>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import WalletForm from '@/components/Forms/WalletForm'
export default {
  computed: {
    ...mapGetters([
      'theme',
      'editedWallet'
    ])
  },
  methods: {
    ...mapMutations([
      'closeBackdrop'
    ])
  },
  components: {
    WalletForm
  }
}
</script>

<style lang="scss" scoped>
.wallet {
  padding: 3rem;
  width: 50vw;
  border-radius: .5rem;
   &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 3rem;
        & h1 {
          color: var(--textColor--dark)
        }
    }
}
</style>
