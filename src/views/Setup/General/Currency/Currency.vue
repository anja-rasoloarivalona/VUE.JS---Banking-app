<template>
    <div class="setup__view__content setup-currency" :class="{left: setup.currentSetupStep !== 'currency'}">
        <div class="setup__view__content__imgContainer">
            <currency-img />
        </div>
        <div class="setup__view__content__title">
           <b>{{$t('selectYourReferenceCurrency')}}</b>
        </div>
        <form>
            <search-list-input
              v-model="currency"
              :options="currenciesList"
              :listMaxHeight="50"
               placeholder="Currency"
            />
        </form>
        <div class="setup__view__content__text">
            <div>{{ $t('yourReferenceCurrencyShouldBeTheOne') }}.</div>
            <div>{{ $t('yourBalanceAndStatisticsWillBeDisplayed')}}.</div>
        </div>
        <div class="setup__view__content__cta">
          <app-btn normal primary :disabled="currency === ''" @click.native="saveCurrency">
              {{ $t('next')}}
          </app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CurrencyImg from './CurrencyImg'
import currencies from '@/assets/currencies'
import SearchListInput from '@/components/Input/SearchListInput'

export default {
  data () {
    return {
      currency: '',
      currenciesList: []
    }
  },
  beforeMount () {
    const currenciesList = []
    for (const currency in currencies) {
      currenciesList.push(`${currency} - ${currencies[currency]}`)
    }
    this.currenciesList = currenciesList
    if (this.currentCurrency !== '') {
      this.currency = this.currentCurrency
    }
  },
  computed: {
    ...mapGetters([
      'setup',
      'currentCurrency'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentSetupStep'
    ]),
    saveCurrency: async function () {
      const result = await this.$store.dispatch('setCurrency', this.currency)
      if (result) {
        this.setCurrentSetupStep('wallets')
      }
    }
  },
  components: {
    CurrencyImg,
    SearchListInput
  }
}
</script>

<style lang="scss" scoped>
.setup-currency {
  padding-bottom: 4rem;
  & form {
    width: 65%;
  }
}
</style>
