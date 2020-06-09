<template>
    <div class="currency" :class="{left: setup.currentSetupStep !== 'currency'}">
        <div class="currency__imgContainer">
            <currency-img />
        </div>
        <div class="currency__title">
           <b>Select your reference currency</b>
        </div>
        <app-select-input
            v-model="currency"
            :options="currenciesList"
            :listMaxHeight="50"
            showScrollBar
            placeholder="Currency"
        />
        <div class="currency__text">
            Your reference currency should be the one you use on a daily basis. Your balance and statistics will be displayed in that currency.
        </div>
        <app-btn normal primary :disabled="currency === ''" @click.native="setCurrentSetupStep('wallets')">
            Next
        </app-btn>
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
  },
  computed: {
    ...mapGetters([
      'setup'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentSetupStep'
    ])
  },
  components: {
    CurrencyImg
  }
}
</script>

<style lang="scss" scoped>
.currency {
    width: 50%;
    height: 40%;
    max-width: 50rem;
    background: $color-white;
    border-radius: .5rem;
    position: absolute;
    top: 10rem;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 6rem;
    padding-top: 7rem;
    transition: all .3s ease-in;
    &.left {
        transform: translateX(-100vw);
    }
    & button {
        position: absolute;
        bottom: -8rem;
    }
    &__title {
        font-size: 2rem;
        color: var(--textColor--dark);
        margin-bottom: 3rem;
    }
    &__text {
        font-size: $font-s;
        text-align: center;
        margin-top: 3rem;
    }
    &__imgContainer {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        background: var(--on-surfaceColor);
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 0;
        right: 0;
        margin: auto;
        top: -5rem;
    }
    & .label {
        width: 25rem;
    }
}
</style>
