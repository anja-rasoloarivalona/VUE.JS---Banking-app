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

        <template v-if="user.wallets.length < 1">
            <div class="setup__view__content__title">
                <b>{{$t('addAWallet')}}</b>
            </div>
            <form class="setup__view__content__form wallets__form">
                <app-select-input v-model="walletData.type" :options="user.walletTypeList" :id="$t('type')" i18/>
                <app-basic-input v-model="walletData.name" :id="$t('name')" />
                <app-basic-input v-model="walletData.amount"  :id="$t('amount')"/>
                <app-basic-input v-model="walletData.creditLimit" :id="$t('limit')" v-if="walletData.type.value === 'Credit card'" />
            </form>
            <div class="setup__view__content__text">
                <div>{{ $t('aWalletIsTheAssetYouUse')}}</div>
                <div>{{$t('thereAre3TypesOfWallets')}}.</div>
            </div>
        </template>
        <template v-else>
            <div class="setup__view__content--main">
                <h1 class="setup__view__content--main__title">{{$t('yourWallets')}}</h1>

                <ul class="wallets__list">
                    <li class="wallets__list__item" @click="openBackdrop('wallet')">
                        <div class="wallets__list__item--add" @click="showForm = true">
                            <app-icon name="add" size="extra-large" color="grey"/>
                        </div>
                    </li>
                    <wallet v-for="wallet in user.wallets" :key="wallet._id" :wallet="wallet"/>
                </ul>
            </div>
        </template>

        <div class="setup__view__content__cta">
            <app-btn normal primary @click.native="setupWalletAction">
                {{ user.wallets.length > 0 ? $t('next') : $t('add') }}
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
        type: {
          value: '',
          i18: ''
        },
        name: '',
        amount: '',
        creditLimit: ''
      }
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
  watch: {
    'user.wallets': function (v) {
      console.log('user walles', v)
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
</style>
