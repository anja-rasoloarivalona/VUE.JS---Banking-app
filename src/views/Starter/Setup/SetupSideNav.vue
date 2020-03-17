<template>
    <div class="setup__sidenav">
        <h1 class="setup__sidenav__title">Setup</h1>
        <ul class="setup__sidenav__stepsList">

                <li class="setup__sidenav__stepsList__item"
                    :class="{current: currentSetup === 'setup-wallet', checked : this.$store.state.wallets.length > 0}">
                    <div class="setup__sidenav__stepsList__item__text">Wallet</div>
                    <app-icon name="wallet" size="large" :color="checkWallets"/>
                </li>
                <div class="setup__sidenav__stepsList__bar">
                    <div class="setup__sidenav__stepsList__bar__inner"
                    :class="{full: currentSetup === 'setup-income'}">
                    </div>
                </div>

                <li class="setup__sidenav__stepsList__item"
                    :class="{current: currentSetup === 'setup-income'}"
                >
                    <div class="setup__sidenav__stepsList__item__text">Income</div>
                    <app-icon name="income" size="large" :color="checkIncome"/>
                </li>
                <div class="setup__sidenav__stepsList__bar">
                    <div class="setup__sidenav__stepsList__bar__inner"></div>
                </div>

                <li class="setup__sidenav__stepsList__item"
                    :class="{current: currentSetup === 'setup-expense'}"
                >
                    <div class="setup__sidenav__stepsList__item__text">Expense</div>
                    <app-icon name="expense" size="large" :color="checkExpense"/>
                </li>
                <div class="setup__sidenav__stepsList__bar">
                    <div class="setup__sidenav__stepsList__bar__inner"></div>
                </div>

                <li class="setup__sidenav__stepsList__item">
                    <div class="setup__sidenav__stepsList__item__text">Savings</div>
                    <app-icon name="savings-plan" size="large" color="grey"/>
                </li>
        </ul>
    </div>
</template>

<script>
export default {
  computed: {
    checkWallets () {
      if (this.$store.state.wallets.length > 0) {
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
    }
  },
  props: {
    currentSetup: String
  }
}
</script>

<style lang="scss" scoped>
.setup {
    &__sidenav {
        position: fixed;
        height: 100vh;
        width: 25rem;
        background: $color-grey--light;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &__title {
            font-size: 3.5rem;
            text-align: center;
            padding: 4rem 0;
            color: $color-primary;
        }
        &__stepsList {
            display: flex;
            flex-direction: column;
            align-items: center;
            list-style: none;
            width: 100%;
            margin-top: 3rem;
            flex: 1;
            & > * {
                transform: translateX(2rem);
            }
            &__item {
                position: relative;
                width: 6rem;
                height: 6rem;
                border-radius: 50%;
                border: 3px solid $color-grey--main;
                background: $color-grey--main;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all .3s ease-in;
                &.current {
                    // transition-delay: .3s;
                    border: 3px solid $color-primary;
                    background: $color-white;
                    & .setup__sidenav__stepsList__item__text {
                        color: $color-primary;
                        font-weight: bold;
                    }
                }
                &.checked {
                   background: $color-primary;
                   border: 3px solid $color-primary;
                }
                &__text {
                    position: absolute;
                    right:7rem;
                    top: 0;
                    width: 10rem;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    color: $color-grey--main;
                    font-size: $font-m;
                }
            }
            &__bar {
                width: .8rem;
                height: 10rem;
                background: $color-grey--main;
                position: relative;
                &__inner {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 0%;
                    background: $color-primary;
                    transition: all .3s ease-in;
                    &.full {
                        height: 100%;
                    }
                }
            }
        }
    }
}
</style>
