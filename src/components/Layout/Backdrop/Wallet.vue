<template>
    <div class="backdrop-wallet" :class="{'bg-white': theme.isLight, 'bg-surfaceColor': theme.isDark}">
        <div class="backdrop-wallet__header">
                <h1 v-text="editedWallet ? $t('editWallet') : $t('addAWallet')"></h1>
                <div class="backdrop-wallet__header__close" @click="closeBackdrop">
                    <app-icon name="close" size="large"/>
                </div>
        </div>
        <div class="backdrop-wallet__content">
           <form>
              <app-basic-input v-model="walletInput.name" :id="$t('name')" row/>
              <app-select-input v-model="walletInput.walletType" :id="$t('type')"  :options="user.walletTypeList" :isDisabled="disabledInput" i18 row/>
              <app-basic-input v-model="walletInput.amount" :id="$t('amount')" :isDisabled="disabledInput" type="number" row/>
              <app-basic-input v-model="walletInput.creditLimit" :id="$t('limit')" v-if="walletInput.walletType.value === 'Credit card'"  type="number" row/>
          </form>
          <div class="backdrop-wallet__content__view">
              <wallet :wallet="walletInput" />
          </div>
        </div>
        <div class="backdrop-wallet__cta">
          <app-btn normal secondary @click.native="closeBackdrop">{{$t('cancel')}}</app-btn>
          <app-btn normal @click.native="walletAction" primary>
            <span v-if="!loading" v-text="editedWallet ? $t('edit'): $t('add')"></span>
            <app-spinner v-else></app-spinner>
          </app-btn>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapGetters } from 'vuex'
import { addWallet, editWallet } from '@/graphQL/walletsQuery'
import Wallet from '@/components/UI/Wallet'
export default {
  data () {
    return {
      walletInput: {
        walletType: {
          value: '',
          i18: ''
        },
        amount: 0,
        name: '',
        creditLimit: 0
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'theme',
      'editedWallet',
      'user',
      'auth',
      'editedWallet'
    ]),
    disabledInput () {
      let res = true
      if (this.auth.appStatus === 'setup') {
        res = false
      }
      if (!this.editedWallet) {
        res = false
      }
      return res
    }
  },
  mounted () {
    if (this.editedWallet) {
      // console.log('edited', this.editedWallet)
      let i18 = ''
      this.user.walletTypeList.find(item => {
        if (item.value === this.editedWallet.walletType) {
          i18 = item.i18
          return true
        }
      })
      this.walletInput = {
        ...this.editedWallet,
        walletType: {
          value: this.editedWallet.walletType,
          i18: i18
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      'closeBackdrop'
    ]),
    walletAction () {
      if (!this.editedWallet) {
        this.addWalletHandler()
      } else {
        this.editWalletHandler()
      }
    },
    addWalletHandler: async function () {
      this.loading = true
      const graphqlQuery = addWallet(this.walletInput)
      try {
        const response = await axios.post('/', graphqlQuery)
        const resData = response.data.data.addWallet
        resData.type = 'wallets'
        this.$store.commit('addUserItem', resData)
        this.loading = false
        this.closeBackdrop()
      } catch (err) {
        this.loading = false
        console.log(err.response)
      }
    },
    editWalletHandler: async function () {
      this.loading = true
      const graphqlQuery = editWallet(this.walletInput)
      try {
        const response = await axios.post('', graphqlQuery)
        const resData = response.data.data.editWallet
        resData.type = 'wallets'
        this.$store.commit('editUserItem', resData)
        this.loading = false
        this.closeBackdrop()
      } catch (err) {
        this.loading = false
        console.log(err.response)
      }
    }
  },
  components: {
    Wallet
  }
}
</script>

<style lang="scss" scoped>
.backdrop-wallet {
  padding: 3rem;
  // width: 30vw;
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
  &__content {
    display: flex;
    align-items: center;
    // background: red;
    & form {
      // background: green;
      width: 25rem;
      & label {
        margin-bottom: 2rem;
      }
    }
    &__view {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        padding: 0 5rem;
    }
  }
  &__cta {
    // background: blue;
    margin-top: 3rem;
    display: flex;
    justify-content: center;
  }
}
</style>
