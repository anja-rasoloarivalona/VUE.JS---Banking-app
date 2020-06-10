<template>
    <div class="setup__view__content incomes"
        :class="{
          right: ['currency', 'wallets'].includes(setup.currentSetupStep),
          left: ['expenses', 'goal'].includes(setup.currentSetupStep),
          expand: user.incomes.length > 0
        }"
    >
        <div class="setup__view__content__imgContainer">
            <app-icon name="income" :size="'xxl'" />
        </div>
        <template v-if="user.incomes.length === 0">
          <div class="setup__view__content__title">
                  <b>Add income</b>
          </div>
          <form class="setup__view__content__form incomes__form">
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
            <div class="incomes__content">
              <h1 class="incomes__content__title">Your incomes</h1>
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
  &__form {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 25rem);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    column-gap: 1rem;
    row-gap: 1rem;
    align-items: center;
    justify-content: center;
    justify-items: center;
    padding: 1rem 0;
    & label.frequency {
      grid-column: 1 / -1;
    }
  }
  &__content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding:  0 3rem;
        &__title {
            display: flex;
            align-items: center;
            height: 10rem;
            color: var(--textColor--dark);
            margin-bottom: 3rem;
        }
    }
}
</style>
