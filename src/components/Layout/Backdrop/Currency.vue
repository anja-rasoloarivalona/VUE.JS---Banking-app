<template>
      <div class="currency" :class="{'bg-white': theme.isLight, 'bg-surfaceColor': theme.isDark}">
        <div class="currency__title">
           <h1>{{$t('selectYourReferenceCurrency')}}</h1>
        </div>
         <form>
            <search-list-input
              v-model="currency"
              :options="currenciesList"
              :listMaxHeight="35"
               placeholder="Currency"
            />
        </form>
         <div class="currency__cta">
            <app-btn normal secondary @click.native="closeBackdrop">
              {{ $t('cancel')}}
          </app-btn>
          <app-btn normal primary :disabled="currency === ''" @click.native="saveCurrency">
              {{ $t('save')}}
          </app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
      'theme',
      'currentCurrency'
    ])
  },
  methods: {
    ...mapMutations([
      'closeBackdrop',
      'addError'
    ]),
    saveCurrency: async function () {
      if (this.currenciesList.includes(this.currency)) {
        const result = await this.$store.dispatch('setCurrency', this.currency)
        if (result) {
          this.closeBackdrop()
        }
      } else {
        this.addError('Please, select one of the currency in the list.')
      }
    }
  },
  components: {
    SearchListInput
  }
}
</script>

<style lang="scss" scoped>
.currency {
    padding: 3rem;
    width: 39vw;
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__title {
        color: var(--textColor--dark);
        margin-bottom: 2.5rem;
    }
    & label {
        margin-bottom: 2rem;
        width: 25rem
    }
}
</style>
