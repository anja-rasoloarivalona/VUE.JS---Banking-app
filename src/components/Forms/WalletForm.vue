<template>
        <form class="form">
                <app-select-input v-model="walletInput.walletType" :id="'type'"  :options="walletTypes" />
                <app-basic-input v-model="walletInput.supplier" :id="'supplier'" />
                <app-basic-input v-model="walletInput.amount" :id="'amount'" />
                <app-basic-input v-model="walletInput.creditLimit" :id="'limit'" v-if="['Visa', 'MasterCard'].includes(walletInput.walletType)"/>
                <!-- <app-basic-input v-model="walletInput.shortId" :id="'Last  4 numbers'" /> -->
                <!-- <app-color-input v-model="walletInput.color" @click="chooseColor($event)"></app-color-input> -->
                <div class="form__cta">
                  <app-btn normal warning v-if="isCancelBtnDisplayed" @click.native="$emit('hideForm')">Cancel</app-btn>
                  <app-btn normal @click.native="walletAction" primary>
                    <span v-if="!loading" v-text="editedWallet ? 'Edit': 'Add'">Add</span>
                    <app-spinner v-else></app-spinner>
                  </app-btn>
                </div>
        </form>
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
        shortId: 1234,
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
    isCancelBtnDisplayed: Boolean
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
        console.log(err)
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
.form {
    width: 100%;
    padding-bottom: 4rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    column-gap: 2rem;
    row-gap: 1rem;
      &__color {
        display: flex;
        align-items: center;
        margin-bottom: 6rem;
        & span {
          width: 6rem;
          margin-bottom: 0.5rem;
          font-size: $font-m;
          color: $color-grey--dark;
        }
        &__select {
          position: relative;
          &__value {
            width: 2em;
            height: 2rem;
            border: 1px solid $color-grey--main;
            border-radius: .3rem;
            cursor: pointer;
          }
          &__list {
            position: absolute;
            top: 0rem;
            left: 6rem;
            list-style: none;
            width: 6rem;
            display: grid;
            border-radius: .5rem;
            overflow: hidden;
            grid-template-columns: repeat(auto-fit, 2rem);
            grid-auto-rows: 2rem;
            &__item {
              width: 2rem;
              height: 2rem;
              cursor: pointer;
            }
          }
        }
      }
      &__cta {
        height: 8rem;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        // background: red;
        display: flex;
        align-items: center;
        justify-content: center;
        // & button {
        //   height: 3.5rem;
        // }
      }
}

</style>
