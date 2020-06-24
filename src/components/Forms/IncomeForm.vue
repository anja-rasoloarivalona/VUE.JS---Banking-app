<template>
  <div class="income-form">
      <slot />
      <form>
            <app-income-input v-model="income.category"/>
            <app-basic-input v-model="income.amount" :id="$t('amount')" />
            <app-date-input v-model="income.lastPayout" :id="$t('lastPaymentDate')"/>
            <app-basic-input v-model="income.from" :id="$t('details')"/>
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
        category: {},
        amount: 0,
        details: '',
        lastPayout: new Date(),
        autoWriting: { value: 'yes', i18: 'yes' },
        notification: { value: 'yes', i18: 'yes' },
        frequency: {
          counter: '',
          period: ''
        },
        alreadyUsedThisCurrentMonth: false
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
        lastPayout: new Date(this.editedIncome.lastPayout),
        autoWriting: this.editedIncome.autoWriting ? 'yes' : 'no',
        notification: this.editedIncome.notification ? 'yes' : 'no'
      }
    }
  },
  watch: {
    'income.category': {
      handler: 'setData',
      immediate: false
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'editedIncome',
      'currentPeriodReport'
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
    setData (category) {
      const foundIncome = this.currentPeriodReport.details.find(detail => {
        if (detail.category === 'Income' && detail.subcategory === category.value) {
          this.income.alreadyUsedThisCurrentMonth = true
          return true
        }
      })
      if (!foundIncome) {
        this.income.alreadyUsedThisCurrentMonth = false
      }
    },
    close () {
      this.closeBackdrop()
      this.$emit('hideForm')
    },
    submit: async function () {
      this.loading = true
      let result = false
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
