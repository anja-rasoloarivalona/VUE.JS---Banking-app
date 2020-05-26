<template>
  <div class="wallet-form">
    <slot />
   <form>
        <app-select-input v-model="walletInput.walletType" :id="'type'"  :options="walletTypes" :isDisabled="typeIsDisabled"/>
        <app-basic-input v-model="walletInput.supplier" :id="'supplier'" />
        <app-basic-input v-model="walletInput.amount" :id="'amount'" :isDisabled="amountIsDisabled"/>
        <app-basic-input v-model="walletInput.creditLimit" :id="'limit'" v-if="['Visa', 'MasterCard'].includes(walletInput.walletType)"/>
    </form>
    <div class="wallet-form__cta">
          <app-btn normal secondary v-if="isCancelBtnDisplayed" @click.native="$emit('hideForm')">Cancel</app-btn>
          <app-btn normal @click.native="walletAction" primary>
            <span v-if="!loading" v-text="editedWallet ? 'Edit': 'Add'">Add</span>
            <app-spinner v-else></app-spinner>
          </app-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { addWallet, editWallet } from '@/graphQL/walletsQuery'
export default {
  data () {
    return {
      walletInput: {
        walletType: 'Visa',
        amount: 0,
        supplier: 'Bank',
        color: 'Brown',
        creditLimit: 0
      },
      walletTypes: ['Visa', 'MasterCard', 'Debit', 'Cash'],
      showColorList: false,
      colorList: ['Brown', 'Chocolate', 'Coral', 'Crimson', 'DarkCyan', 'DarkBlue', 'FireBrick', 'OrangeRed', 'Teal'],
      loading: false
    }
  },
  props: {
    editedWallet: Object,
    isCancelBtnDisplayed: Boolean,
    amountIsDisabled: Boolean,
    typeIsDisabled: Boolean
  },
  mounted () {
    if (this.editedWallet) {
      this.walletInput = {
        ...this.editedWallet
      }
    }
  },
  methods: {
    chooseColor (value) {
      this.walletInput.color = value
      this.showColorList = false
    },
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
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-form {
  & form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    column-gap: 2rem;
    row-gap: 1rem;
  }
   &__cta {
      display: flex;
      justify-content: center;
      // position: relative;
      // z-index: 10;
  }

}

</style>
