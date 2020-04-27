<template>
    <div class="setup__sidenav">
        <div class="setup__sidenav__header">
          <div class="setup__sidenav__header__logo"></div>
        </div>
        <ul class="setup__sidenav__list">
          <li
            v-for="(step, index) in setupSteps"
            class="setup__sidenav__list__item"
            :class="{active: currentSetupStep === step}"
            :key="step">
            <div class="setup__sidenav__list__item__details">
              <div class="setup__sidenav__list__item__details__title"><h2>Step {{ index + 1}}</h2></div>
              <div class="setup__sidenav__list__item__details__subtitle">{{ step }}</div>
            </div>
            <div class="setup__sidenav__list__item__logo"></div>
          </li>
        </ul>

        <!-- <ul class="setup__sidenav__stepsList">
                <li class="setup__sidenav__stepsList__item"
                    :class="{
                        current: currentSetup === 'setup-wallet',
                        checked : this.$store.state.user.wallets.length > 0
                    }"
                    @click="$emit('selectSetup', 'wallet')">
                    <div class="setup__sidenav__stepsList__item__text">Wallet</div>
                    <app-icon name="wallet" size="large" :color="checkWallets"/>
                </li>

                <div class="setup__sidenav__stepsList__bar">
                    <div class="setup__sidenav__stepsList__bar__inner"
                    :class="{full: ['setup-income', 'setup-expense', 'setup-savings-plan'].includes(currentSetup)}">
                    </div>
                </div>

                <li class="setup__sidenav__stepsList__item"
                    :class="{
                      current: currentSetup === 'setup-income',
                      checked: this.$store.state.user.incomes.length > 0 && ['setup-expense', 'setup-savings-plan'].includes(currentSetup)
                    }"
                    @click="$emit('selectSetup', 'income')">
                    <div class="setup__sidenav__stepsList__item__text">Income</div>
                    <app-icon name="income" size="large" :color="checkIncome"/>
                </li>
                <div class="setup__sidenav__stepsList__bar">
                    <div class="setup__sidenav__stepsList__bar__inner"
                    :class="{full: ['setup-expense', 'setup-savings-plan'].includes(currentSetup)}"></div>
                </div>

                <li class="setup__sidenav__stepsList__item"
                    :class="{current: currentSetup === 'setup-expense',
                    checked: this.$store.state.user.expenses.length > 0 && ['setup-savings-plan'].includes(currentSetup)
                    }"
                >
                    <div class="setup__sidenav__stepsList__item__text">Expense</div>
                    <app-icon name="expense" size="large" :color="checkExpense"/>
                </li>
                <div class="setup__sidenav__stepsList__bar">
                    <div class="setup__sidenav__stepsList__bar__inner"
                    :class="{full: ['setup-savings-plan'].includes(currentSetup)}"></div>
                </div>

                <li class="setup__sidenav__stepsList__item"
                    :class="{
                      current: currentSetup === 'setup-savings-plan'
                    }">
                    <div class="setup__sidenav__stepsList__item__text">Savings</div>
                    <app-icon name="savings-plan" size="large" :color="checkSavings"/>
                </li>
        </ul> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'currentSetupStep',
      'setupSteps'
    ]),
    checkWallets () {
      if (this.$store.state.user.wallets.length > 0) {
        return 'white'
      } else {
        return 'primary'
      }
    },
    checkIncome () {
      if (this.currentSetup === 'setup-income') {
        return 'primary'
      } else {
        return 'grey'
      }
    },
    checkExpense () {
      if (this.currentSetup === 'setup-expense') {
        return 'primary'
      } else {
        return 'grey'
      }
    },
    checkSavings () {
      if (this.currentSetup === 'setup-savings-plan') {
        return 'primary'
      } else {
        return 'grey'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.setup {
    &__sidenav {
        display: flex;
        flex-direction: column;
        align-items: center;
        &__header {
        height: 9rem;
        margin-bottom: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &__logo {
            width: 15rem;
            height: 6rem;
            background-image: url('../../../assets/logo.png');
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
          }
        }

        &__list {
        list-style: none;
        width: 90%;
        &__item {
            height: 8rem;
            background: $color-white;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            margin-bottom: 3rem;
            padding: 1rem;
            &.active {
              background: $color-primary--dark;
              & * {
                color: $color-white
              }
            }
            &__details {
              display: flex;
              flex-direction: column;
              width: 50%;
              &__title {
                & h2 {
                    display: flex;
                    align-items: center;
                    text-transform: capitalize;
                    margin-bottom: 1rem;
                }
              }
              &__subtitle {
                display: flex;
                color: $color-grey--dark;
                font-size: $font-m;
                text-transform: capitalize;
              }
            }
        }
    }
    }
}
</style>
