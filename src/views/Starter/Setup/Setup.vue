<template>
    <div class="setup">
        <setup-side-nav :currentSetup="mode"/>
        <div class="setup__view">
          <h2 class="setup__view__title">{{title}}</h2>
          <br>
          <p class="setup__view__desc">
            <span>{{description[title].line1}}</span>
            <span>{{description[title].line2}}</span>
          </p>
          <component
            :is="mode"
            @startSetupIncome="mode = 'setup-income'"
          />
        </div>
    </div>
</template>

<script>
import SetupSideNav from './SetupSideNav'
import SetupWallet from './SetupWallet/SetupWallet'
import SetupIncome from './SetupBudget/SetupIncome'
import SetupExpense from './SetupBudget/SetupExpense'

import SetupSavingsPlan from './SetupSavingsPlan'
export default {
  data () {
    return {
      mode: 'setup-wallet',
      description: {
        wallet: {
          line1: "Let's begin with your wallet. Here you can provide information about all the different methods you use to make a transaction.",
          line2: 'For example, you can enter your debit card, your credit card or your wallet to store cash.'
        },
        income: {
          line1: "Now let's setup your budget",
          line2: 'Here, you can specify your incomes and expenses'
        }
      }
    }
  },
  computed: {
    title () {
      return this.mode.split('-')[1]
    }
  },
  components: {
    setupWallet: SetupWallet,
    setupIncome: SetupIncome,
    setupExpense: SetupExpense,
    setupSavingsPlan: SetupSavingsPlan,
    setupSideNav: SetupSideNav
  }
}
</script>

<style lang="scss" scoped>
.setup {
    grid-row: 1 / -1;
    grid-column: 1 / -1;
    max-width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 25rem minmax(8rem, 1fr) minmax(70vw, 120rem) minmax(8rem, 1fr);
    grid-template-rows: max-content;
    background: $color-white;
    position: relative;
    overflow: hidden;
    &__view {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
        min-height: 100vh;
        max-width: 120rem;
        padding: 4rem 0;
         &__title {
            font-size: 3.5rem;
            color: $color-primary;
            text-transform: capitalize;
        }
        &__desc {
            display: flex;
            flex-direction: column;
            font-size: $font-m;
            line-height: 1.4;
        }
    }
}
</style>
