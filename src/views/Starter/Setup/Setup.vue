<template>
    <div class="setup">
        <header class="setup__header">
            <h1 class="setup__header__title">Setup</h1>
            <ul class="setup__header__stepsList">
                <li class="setup__header__stepsList__item">
                    <app-icon name="wallet" size="large" color="primary"/>
                </li>
                <div class="setup__header__stepsList__bar"></div>
                <li class="setup__header__stepsList__item">
                    <app-icon name="budget" size="large" color="grey"/>
                </li>
                <div class="setup__header__stepsList__bar"></div>
                <li class="setup__header__stepsList__item">
                    <app-icon name="savings-plan" size="large" color="grey"/>
                </li>
            </ul>
        </header>
        <component
            :is="mode"
        >
        </component>
    </div>
</template>

<script>
import SetupWallet from './SetupWallet/SetupWallet'
import SetupBudget from './SetupBuget'
import SetupSavingsPlan from './SetupSavingsPlan'
export default {
  data () {
    return {
      mode: 'setup-wallet'
    }
  },
  components: {
    setupWallet: SetupWallet,
    setupBudget: SetupBudget,
    setupSavingsPlan: SetupSavingsPlan
  }
}
</script>

<style lang="scss" scoped>
.setup {
    grid-row: 1 / -1;
    grid-column: 1 / -1;
    width: 100vw;
    height: 100vh;
    &__header {
        height: 7rem;
        display: flex;
        align-items: center;
        width: 100%;
        padding-left: 8rem;
        background: $color-grey--light;
        &__title {
            color: $color-primary
        }
        &__stepsList {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-right: 14rem;
            list-style: none;
            &__item {
                display: flex;
                justify-content: center;
                border: 2px solid $color-grey--main;
                padding: 1rem;
                border-radius: 50%;
                &:first-child {
                    border: 2px solid $color-primary;
                    background: $color-white;
                }
            }
            &__bar {
                width: 5rem;
                height: 2px;
                background: $color-grey--main;
            }
        }
    }
    &__view {
        margin: 2rem 8rem;
    }
}
</style>
