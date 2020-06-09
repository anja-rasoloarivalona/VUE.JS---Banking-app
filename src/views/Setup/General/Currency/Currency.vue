<template>
    <div class="setup__view__content" :class="{left: setup.currentSetupStep !== 'currency'}">
        <div class="setup__view__content__imgContainer">
            <currency-img />
        </div>
        <div class="setup__view__content__title">
           <b>Select your reference currency</b>
        </div>
        <form class="setup__view__content__form">
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
.currency {
    // width: 50%;
    // height: 40%;
    // max-width: 50rem;
    // background: $color-white;
    // border-radius: .5rem;
    // position: absolute;
    // top: 10rem;
    // left: 0;
    // right: 0;
    // margin: auto;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // padding: 0 6rem;
    // padding-top: 7rem;
    // transition: all .3s ease-in;

    // & button {
    //     position: absolute;
    //     bottom: -8rem;
    // }
    // &__title {
    //     font-size: 2rem;
    //     color: var(--textColor--dark);
    //     margin-bottom: 3rem;
    // }
    // &__text {
    //     font-size: $font-s;
    //     text-align: center;
    //     margin-top: 3rem;
    // }
    // &__imgContainer {
    //     width: 10rem;
    //     height: 10rem;
    //     border-radius: 50%;
    //     background: var(--on-surfaceColor);
    //     position: absolute;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     left: 0;
    //     right: 0;
    //     margin: auto;
    //     top: -5rem;
    // }
    // & .label {
    //     width: 25rem;
    // }
}
</style>
