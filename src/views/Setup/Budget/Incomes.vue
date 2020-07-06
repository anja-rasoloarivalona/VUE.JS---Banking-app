<template>
    <div class="setup__view__content incomes"
        :class="{
          right: ['currency', 'wallets'].includes(setup.currentSetupStep),
          left: ['expenses', 'goal'].includes(setup.currentSetupStep),
          expand: user.incomes.length > 0
        }"
    >
        <div class="setup__view__content__imgContainer">
            <app-icon name="income" :size="user.incomes.length > 0 ? 'extra-large' : 'xxl'" />
        </div>
        <template v-if="user.incomes.length === 0">
          <div class="setup__view__content__title">
                  <b>{{$t('addIncome')}}</b>
          </div>
          <form class="setup__view__content__form">
            <app-income-input v-model="income.category"/>
            <app-basic-input v-model="income.amount" :id="$t('amount')" type="number"/>
            <app-date-input v-model="income.lastPayout" :id="$t('lastPaymentDate')"/>
            <app-basic-input v-model="income.details" :id="$t('details')"/>
            <app-select-input v-model="income.autoWriting" :id="$t('automaticWriting')" :options="yesOrNoList" i18 />
            <app-select-input v-model="income.notification" :id="$t('notification')" :options="yesOrNoList" i18/>
            <app-frequency-input v-model="income.frequency" :id="$t('frequency')" />
          </form>
        </template>
        <template v-else>
            <div class="setup__view__content--main">
              <h1 class="setup__view__content--main__title">{{$t('yourIncomes')}}</h1>
              <div class="setup__view__content--main__add" @mouseenter="addHovered = true" @mouseleave="addHovered = false" @click="openBackdrop('income')">
                  <app-icon name="add" :color="addHovered ? 'white' : 'secondary'" size="extra-large"/>
              </div>
              <income-table :incomes="user.incomes"/>
            </div>
        </template>
        <div class="setup__view__content__cta">
            <app-btn normal secondary v-if="user.incomes.length < 1" @click.native="setCurrentSetupStep('expenses')">{{ $t('skip')}}</app-btn>
            <app-btn normal primary @click.native="setupIncomeAction">
                {{ user.incomes.length > 0 ? $t('next') : $t('add')}}
            </app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import IncomeTable from '@/components/UI/Income/IncomeTable'
import AppIncomeInput from '@/components/Input/IncomeInput/IncomeInput'
export default {
  data () {
    return {
      addHovered: false,
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
  computed: {
    ...mapGetters([
      'user',
      'setup',
      'incomesList'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentSetupStep',
      'openBackdrop'
    ]),
    ...mapActions([
      'addIncome'
    ]),
    addIncomeHandler: async function () {
      this.loading = true
      await this.addIncome(this.income)
    },
    setupIncomeAction () {
      if (this.user.incomes.length < 1) {
        this.addIncomeHandler()
      } else {
        this.setCurrentSetupStep('expenses')
      }
    }
  },
  components: {
    IncomeTable,
    AppIncomeInput
  }
}
</script>

<style lang="scss" scoped>
.incomes {
    width: 60%;
    max-width: 60rem;
  & label.frequency {
      grid-column: 1 / -1;
  }
}
</style>
