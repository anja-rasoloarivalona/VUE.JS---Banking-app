<template>
    <div class="setup__view__content wallets"
        :class="{
            right: setup.currentSetupStep === 'currency',
            left: ['budget', 'incomes', 'expenses', 'goal'].includes(setup.currentSetupStep),
            expand: user.wallets.length > 0
        }">
        <div class="setup__view__content__imgContainer">
            <app-icon name="wallet" :size="user.wallets.length > 0 ? 'extra-large' : 'xxl'" />
        </div>

        <template v-if="user.wallets.length === 0">
            <div class="setup__view__content__title">
                <b>Add a wallet</b>
            </div>
            <form class="setup__view__content__form wallets__form">
                <app-select-input v-model="walletData.type" :options="walletTypeList" id="Type"/>
                <app-basic-input v-model="walletData.name" id="Name" />
                <app-basic-input v-model="walletData.amount"  id="Amount"/>
                <app-basic-input v-model="walletData.limit" id="Limit" v-if="walletData.type === 'Credit card'" />
            </form>
            <div class="setup__view__content__text">
                <div>Your reference currency should be the one you use on a daily basis.</div>
                <div>Your balance and statistics will be displayed in that currency.</div>
            </div>
        </template>
        <template v-else>
            <div class="wallets__content">
                <h1 class="wallets__content__title">Your wallets</h1>
                <ul class="wallets__content__list">
                    <li class="wallets__content__list__item" @click="openBackdrop('wallet')">
                        <div class="wallets__content__list__item--add" @click="showForm = true">
                            <app-icon name="add" size="extra-large" color="grey"/>
                        </div>
                    </li>
                    <wallet v-for="wallet in user.wallets" :key="wallet._id" :wallet="wallet"/>
                </ul>
            </div>
        </template>

        <div class="setup__view__content__cta">
            <app-btn normal primary @click.native="setupWalletAction">
                {{ user.wallets.length > 0 ? 'Next' : 'Add'}}
            </app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Wallet from '@/components/UI/Wallet'
import axios from 'axios'
import { addWallet } from '@/graphQL/walletsQuery'
export default {
  data () {
    return {
      loading: false,
      walletData: {
        type: '',
        name: '',
        amount: '',
        limit: ''
      },
      walletTypeList: ['Debit card', 'Credit card', 'Cash']
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentSetupStep',
      'openBackdrop'
    ]),
    addWalletHandler: async function () {
      this.loading = true
      const graphqlQuery = addWallet(this.walletData)
      try {
        const response = await axios.post('', graphqlQuery)
        const resData = response.data.data.addWallet
        resData.type = 'wallets'
        this.$store.commit('addUserItem', resData)
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err.response)
      }
    },
    setupWalletAction () {
      if (this.user.wallets.length < 1) {
        this.addWalletHandler()
      } else {
        if (this.setup.setupType === 'general') {
          this.setCurrentSetupStep('budget')
        } else {
          this.setCurrentSetupStep('incomes')
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'setup',
      'user'
    ])
  },
  components: {
    Wallet
  }
}
</script>

<style lang="scss" scoped>
.wallets {
    width: 60%;
    max-width: 60rem;
    &__form {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 25rem);
        grid-template-rows: max-content;
        grid-auto-rows: max-content;
        column-gap: 1rem;
        row-gap: 1rem;
        align-items: center;
        justify-content: center;
        justify-items: center;
        padding: 1rem 0;
    }
    &__content {
        // background: green;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding:  0 3rem;
        &__title {
            display: flex;
            align-items: center;
            height: 10rem;
            // font-size: 2rem;
            color: var(--textColor--dark)
            // background: red;
        }
        &__list {
            display: grid;
            grid-template-columns: repeat(auto-fit, 25rem);
            grid-template-rows: max-content;
            grid-auto-rows: max-content;
            align-items: center;
            column-gap: 2rem;
            row-gap: 2rem;
            // background: green;
            &__item {
                min-width: 25rem;
                max-width: 25rem;
                height: 12rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px dashed var(--textColor--dark);
                border-radius: 1rem;
            }
        }
    }
}
</style>
