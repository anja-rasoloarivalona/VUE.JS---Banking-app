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
            background: var(--surfaceColor);
            border-radius: 1rem;
            display: flex;
            align-items: center;
            margin-bottom: 3rem;
            padding: 1rem;
            &.active {
              background: var(--mainColor--dark);
              & * {
                color: var(--surfaceColor)
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
                color: var(--textColor--dark);
                font-size: $font-m;
                text-transform: capitalize;
              }
            }
        }
    }
    }
}
</style>
