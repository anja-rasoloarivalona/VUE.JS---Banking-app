<template>
    <div class="setup__view__content setup-currency" :class="{left: setup.currentSetupStep !== 'currency'}">
        <div class="setup__view__content__imgContainer">
            <currency-img />
        </div>
        <div class="setup__view__content__title">
           <b>Select your reference currency</b>
        </div>
        <form>
            <app-select-input
              v-model="currency"
              :options="currenciesList"
              :listMaxHeight="50"
              showScrollBar
              placeholder="Currency"
            />
        </form>
        <div class="setup__view__content__text">
            <div>Your reference currency should be the one you use on a daily basis.</div>
            <div>Your balance and statistics will be displayed in that currency.</div>
        </div>
        <div class="setup__view__content__cta">
          <app-btn normal primary :disabled="currency === ''" @click.native="saveCurrency">
              Next
          </app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CurrencyImg from './CurrencyImg'
import currencies from '@/assets/currencies'

export default {
  data () {
    return {
      currency: '',
      currenciesList: []
    }
  },
  mounted () {
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
    CurrencyImg
  }
}
</script>

<style lang="scss" scoped>
.setup-currency {
  padding-bottom: 4rem;
}
</style>
