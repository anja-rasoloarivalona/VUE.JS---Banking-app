<template>
  <div class="income-form">
      <slot />
      <form>
            <app-income-input v-model="income.category"/>
            <app-basic-input v-model="income.amount" :id="$t('amount')" type="number"/>
            <app-date-input v-model="income.lastPayout" :id="$t('lastPaymentDate')"/>
            <app-basic-input v-model="income.details" :id="$t('details')"/>
            <app-select-input v-model="income.autoWriting" :id="$t('automaticWriting')" :options="yesOrNoList" i18 />
            <app-select-input v-model="income.notification" :id="$t('notification')" :options="yesOrNoList" i18/>
            <app-frequency-input v-model="income.frequency" :id="$t('frequency')" />
      </form>
      <div class="income-form__cta">
            <app-btn normal secondary v-if="isCancelBtnDisplayed" @click.native="close">
                Cancel
            </app-btn>
            <app-btn normal primary @click.native="submit" >
                    <div v-if="!loading" v-text="editedIncome ? 'Edit' : 'Add'"></div>
                    <app-spinner v-else></app-spinner>
            </app-btn>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import AppIncomeInput from '@/components/Input/IncomeInput/IncomeInput'
export default {
  data () {
    return {
      loading: false,
      income: {
        _id: '',
        category: {

        },
        amount: 0,
        details: '',
        lastPayout: new Date(),
        autoWriting: { value: 'yes', i18: 'yes' },
        notification: { value: 'yes', i18: 'yes' },
        frequency: {
          counter: '',
          period: ''
        }
      },
      yesOrNoList: [
        {
          value: 'yes',
          i18: 'yes'
        },
        {
          value: 'no',
          i18: 'no'
        }
      ]
    }
  },
  mounted () {
    if (this.editedIncome) {
      this.income = {
        ...this.editedIncome,
        category: {
          value: this.editedIncome.subcategory,
          i18: this.incomesList.category[this.editedIncome.subcategory].i18
        },
        frequency: {
          counter: {
            value: this.editedIncome.frequency.counter,
            i18: this.frequencyOptionsi18.counter[this.editedIncome.frequency.counter]
          },
          period: {
            value: this.editedIncome.frequency.period,
            i18: this.frequencyOptionsi18.period[this.editedIncome.frequency.period]
          }
        },
        lastPayout: new Date(this.editedIncome.lastPayout),
        autoWriting: this.editedIncome.autoWriting ? { value: 'yes', i18: 'yes' } : { value: 'no', i18: 'no' },
        notification: this.editedIncome.notification ? { value: 'yes', i18: 'yes' } : { value: 'no', i18: 'no' }
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'editedIncome',
      'currentPeriodReport',
      'incomesList',
      'frequencyOptionsi18'
    ])
  },
  props: {
    isCancelBtnDisplayed: Boolean
  },
  methods: {
    ...mapActions([
      'addIncome',
      'editIncome'
    ]),
    ...mapMutations([
      'closeBackdrop'
    ]),
    close () {
      this.closeBackdrop()
      this.$emit('hideForm')
    },
    submit: async function () {
      this.loading = true
      let result = false
      console.log('sunbbmiyt', this.income)
      if (this.editedIncome) {
        result = await this.editIncome(this.income)
      } else {
        result = await this.addIncome(this.income)
      }
      if (result) {
        this.loading = false
        this.close()
      } else {
        this.loading = false
      }
    }
  },
  components: {
    AppIncomeInput
  }
}
</script>

<style lang="scss" scoped>
.income-form {
  & form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: max-content;
      grid-auto-rows: max-content;
      column-gap: 2rem;
      row-gap: 1rem;
      & label.frequency {
        grid-column: 1 / 3;
      }
  }
  &__cta {
      display: flex;
      justify-content: center;
      // position: relative;
      // z-index: 10;
  }
}

</style>
