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
                  <b>Add income</b>
          </div>
          <form class="setup__view__content__form">
            <app-basic-input v-model="income.name" id="Name"/>
            <app-basic-input v-model="income.amount" id="Amount" />
            <app-date-input v-model="income.lastPayout" id="Last payout" />
            <app-basic-input v-model="income.from" id="From" />
            <app-select-input v-model="income.autoWriting" id="Auto writing" :options="['yes', 'no']" />
            <app-select-input v-model="income.notification" id="Notification" :options="['yes', 'no']" />
            <app-frequency-input v-model="income.frequency" id="Frequency"/>
          </form>
        </template>
        <template v-else>
            <div class="setup__view__content--main">
              <h1 class="setup__view__content--main__title">Your incomes</h1>
              <div class="setup__view__content--main__add" @mouseenter="addHovered = true" @mouseleave="addHovered = false" @click="openBackdrop('income')">
                  <app-icon name="add" :color="addHovered ? 'white' : 'secondary'" size="extra-large"/>
              </div>
              <income-table :incomes="user.incomes"/>
            </div>
        </template>
        <div class="setup__view__content__cta">
            <app-btn normal primary @click.native="setupIncomeAction">
                {{ user.incomes.length > 0 ? 'Next' : 'Add'}}
            </app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import IncomeTable from '@/components/UI/Income/IncomeTable'
// import IncomeForm from '@/components/Forms/IncomeForm'
export default {
  data () {
    return {
      addHovered: false,
      loading: false,
      income: {
        name: '',
        amount: 0,
        lastPayout: new Date(),
        from: '',
        autoWriting: 'yes',
        notification: 'yes',
        frequency: {
          counter: 'once',
          period: 'a day'
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'setup'
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
      const result = await this.addIncome(this.income)
      console.log('income added', result)
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
    IncomeTable
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
