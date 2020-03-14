<template>
    <div class="setup">
        <setup-side-nav />
        <div class="setup__next">
            <app-btn normal primary :click="next">
                Next
            </app-btn>
        </div>
        <component :is="mode" />
    </div>
</template>

<script>
import SetupSideNav from './SetupSideNav'
import SetupWallet from './SetupWallet/SetupWallet'
import SetupBudget from './SetupBuget'
import SetupSavingsPlan from './SetupSavingsPlan'
export default {
  data () {
    return {
      mode: 'setup-wallet'
    }
  },
  methods: {
    next () {
      console.log('a')
    }
  },
  components: {
    setupWallet: SetupWallet,
    setupBudget: SetupBudget,
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
    background: $color-grey--light;
    position: relative;
    overflow: hidden;
    &__view {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
        min-height: 100vh;
        max-width: 120rem;
        padding: 3rem 0;
    }
    &__next {
        position: absolute;
        bottom: 3rem;
        right: 3rem;
    }
}
</style>
