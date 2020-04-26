<template>
    <div class="setup">
      <navbar></navbar>
        <side-nav
          :currentSetup="mode"
          @selectSetup="selectSetup($event)"
        />
        <div class="setup__view">
          <component
            :is="mode"
            @startSetupIncome="mode = 'incomes'"
            @startSetupExpense="mode = 'expenses'"
            @startSetupSavingsPlan="mode ='goal'"
          />
        </div>
    </div>
</template>

<script>
import SideNav from './SetupSideNav'
import Navbar from './SetupNavbar'
import Wallets from './SetupWallet/SetupWallet'
import Incomes from './SetupBudget/SetupIncome'
import Expenses from './SetupBudget/SetupExpense'
import Goal from './SetupSavingsPlan/SetupSavingsPlan'
export default {
  data () {
    return {
      mode: 'wallets'
    }
  },
  computed: {
    title () {
      return this.mode.split('-')[1]
    }
  },
  methods: {
    selectSetup (value) {
      this.mode = `setup-${value}`
    }
  },
  components: {
    Wallets,
    Incomes,
    Expenses,
    Goal,
    Navbar,
    SideNav
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
    background: $color-grey--light;
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
