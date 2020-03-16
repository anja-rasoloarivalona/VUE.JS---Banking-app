<template>
    <div class="walletForm">
        <form class="form">
                <app-select-input :id="'type'"  :options="walletTypes" @selectInput="walletInput.walletType = $event" bgWhite/>
                <app-input v-model="walletInput.supplier" :id="'supplier'" bgWhite/>
                <app-input v-model="walletInput.amount" :id="'amount'" bgWhite/>
                <app-input v-model="walletInput.shortId" :id="'Last  4 numbers'" bgWhite/>
                <div class="form__color">
                      <span>Color</span>
                      <div class="form__color__select">
                        <div class="form__color__select__value" :style="{background: walletInput.color}" @click="showColorList = !showColorList"></div>
                        <ul class="form__color__select__list" v-if="showColorList">
                          <li
                            v-for="(color, index) in colorList"
                            :key="index" class="form__color__select__list__item"
                            :style="{background: color}"
                            @click="chooseColor(color)">
                          </li>
                        </ul>
                      </div>
                </div>
                <app-btn normal @click.native="walletAction">
                    <span v-if="!loading" v-text="editedWallet ? 'Edit': 'Add'">Add</span>
                    <app-spinner v-else></app-spinner>
                </app-btn>
        </form>
        <div class="walletForm__preview">
          <div class="walletForm__preview__wallet">
              <div class="walletForm__preview__wallet__close" @click="$emit('hideForm')">
                  <app-icon name="close" size="large" color="grey"/>
              </div>
              <app-wallet :wallet="walletInput" large></app-wallet>
          </div>
        </div>
    </div>
</template>

<script>
import Wallet from '@/components/Wallet'
export default {
  data () {
    return {
      walletInput: {
        walletType: 'Visa',
        amount: 0,
        supplier: 'Bank',
        shortId: 1234,
        color: 'Brown'
      },
      walletTypes: ['Visa', 'MasterCard', 'Debit', 'Cash'],
      showColorList: false,
      colorList: ['Brown', 'Chocolate', 'Coral', 'Crimson', 'DarkCyan', 'DarkBlue', 'FireBrick', 'OrangeRed', 'Teal'],
      loading: false
    }
  },
  props: {
    editedWallet: Object
  },
  mounted () {
    if (this.editedWallet) {
      this.walletInput = this.editedWallet
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
      const graphqlQuery = {
        query: `mutation {
                    addWallet(walletInput: {
                        walletType: "${this.walletInput.walletType}",
                        amount: "${this.walletInput.amount}",
                        supplier: "${this.walletInput.supplier}",
                        shortId: "${this.walletInput.shortId}",
                        color: "${this.walletInput.color}"
                    }) {
                        _id
                        walletType
                        amount
                        supplier
                        shortId
                        color
                    }
              }`
      }
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.addWallet
        this.$store.commit('addWallet', responseData)
        this.$emit('hideForm')
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    editWalletHandler: async function () {
      this.loading = true
      const graphqlQuery = {
        query: `mutation {
          editWallet( walletId: "${this.editedWallet._id}", walletInput: {
                      walletType: "${this.walletInput.walletType}",
                      amount: "${this.walletInput.amount}",
                      supplier: "${this.walletInput.supplier}",
                      shortId: "${this.walletInput.shortId}",
                      color: "${this.walletInput.color}"
                    }) {
                      _id
                      walletType
                      amount
                      supplier
                      shortId
                      color
                  }
            }`
      }
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.editWallet
        this.loading = false
        this.$emit('hideForm')
        console.log('Wallet updated', responseData)
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    }
  },
  components: {
    'app-wallet': Wallet
  }
}
</script>

<style lang="scss" scoped>
.walletForm {
    margin-top: 4rem;
    width: 100%;
    display: flex;
    background: $color-grey--light;
    border-radius: .5rem;
    & .form {
      width: 30%;
      padding: 2rem;
      padding-bottom: 4rem;
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
      & button {
        height: 3.5rem;
      }
    }
    &__preview {
      width: 100%;
      background: $color-grey--light;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem;
      &__wallet {
        width: 100%;
        height: 100%;
        background: $color-white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: .5rem;
        position: relative;
        &__close {
          position: absolute !important;
          top: 1rem;
          right: 1rem;
        }
      }
    }
}
</style>
