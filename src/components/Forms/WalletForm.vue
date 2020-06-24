<template>
  <div class="wallet-form">
    <!-- <slot /> -->
   <form>
        <app-select-input v-model="walletInput.type" :id="$t('type')"  :options="user.walletTypeList" :isDisabled="disabledInput" i18/>
        <app-basic-input v-model="walletInput.name" :id="$t('name')" />
        <app-basic-input v-model="walletInput.amount" :id="$t('amount')" :isDisabled="disabledInput"/>
        <app-basic-input v-model="walletInput.creditLimit" :id="$t('limit')" v-if="walletInput.type.value === 'Credit card'"/>
    </form>
    <div class="wallet-form__cta">
          <app-btn normal secondary v-if="isCancelBtnDisplayed" @click.native="$emit('hideForm')">{{$t('cancel')}}l</app-btn>
          <app-btn normal @click.native="walletAction" primary>
            <span v-if="!loading" v-text="editedWallet ? $t('edit'): $t('add')"></span>
            <app-spinner v-else></app-spinner>
          </app-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { addWallet, editWallet } from '@/graphQL/walletsQuery'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      walletInput: {
        type: {
          value: '',
          i18: ''
        },
        amount: 0,
        name: '',
        creditLimit: 0
      },
      // showColorList: false,
      // colorList: ['Brown', 'Chocolate', 'Coral', 'Crimson', 'DarkCyan', 'DarkBlue', 'FireBrick', 'OrangeRed', 'Teal'],
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'auth',
      'editedWallet'
    ]),
    disabledInput () {
      let res = true
      if (this.auth.appStatus === 'setup') {
        res = false
      }
      return res
    }
  },
  props: {
    isCancelBtnDisplayed: Boolean
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
        type: {
          value: this.editedWallet.walletType,
          i18: i18
        }
      }
    }
  },
  methods: {
    // chooseColor (value) {
    //   this.walletInput.color = value
    //   this.showColorList = false
    // },
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
        const response = await axios.post('', graphqlQuery)
        const resData = response.data.data.addWallet
        resData.type = 'wallets'
        this.$store.commit('addUserItem', resData)
        this.$emit('hideForm')
        this.loading = false
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
        this.$emit('hideForm')
      } catch (err) {
        this.loading = false
        console.log(err.response)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-form {
  // background: red !important;
  & form {
    display: flex;
    flex-direction: column;
    // margin-bottom: 3rem;
    margin-bottom: 1.5rem;
    & label {
      margin-bottom: 1.5rem;
    }
  }
   &__cta {
      display: flex;
      justify-content: center;
      // background: red;
      // position: relative;
      // z-index: 10;
  }

}

</style>
