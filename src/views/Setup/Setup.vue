<template>
    <div class="setup">
        <backdrop v-if="displayBackdrop">
            <welcome v-if="displayWelcome" @hideWelcome="hideWelcome"/>
        </backdrop>
        <div class="setup__view"  v-else>
            <wallets />
            <incomes />
            <expenses />
            <goal />
        </div>
        <!-- <component v-else :is="currentSetupStep"></component> -->
    </div>
</template>

<script>
import Welcome from './Welcome'
import Wallets from './Wallets'
import Incomes from './Incomes'
import Expenses from './Expenses'
import Goal from './Goal'
import { mapGetters } from 'vuex'
import Backdrop from '@/components/Layout/Backdrop/Backdrop'
export default {
  data () {
    return {
      displayBackdrop: true,
      displayWelcome: true
    }
  },
  computed: {
    ...mapGetters([
      'user'
    // 'currentSetupStep'
    ])
  },
  methods: {
    hideWelcome () {
      this.displayBackdrop = false
      this.displayWelcome = false
    }
  },
  components: {
    Welcome,
    Backdrop,
    Wallets,
    Incomes,
    Expenses,
    Goal
  }
}
</script>

<style lang="scss" >
.setup {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    &__view {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        &__content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: all .5s ease-in;
            &.left {
                transform: translateX(-110%);
            }
            &.right {
                transform: translateX(110%);
            }
            &.center {
                transform: translateX(0);
            }
            &__main {
                height: 16rem;
                width: 100%;
                background: $color-white;
                border-radius: .5rem;
                padding: 2rem;
                position: relative;
                &.expand {
                    height: 90%;
                }
                &__title {
                    color: $color-primary;
                    margin-bottom: 2rem;
                }
                &__details {
                    font-size: $font-m;
                }
                &__list {
                    list-style: none;
                    margin: 4rem 0;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, 25rem);
                    grid-template-rows: 12rem;
                    grid-auto-rows: 12rem;
                    column-gap: 2rem;
                    row-gap: 2rem;
                    &__item {
                        width: 25rem;
                        height: 12rem;
                        &--add {
                            margin: 1rem 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 25rem;
                            height: 12rem;
                            border: 1px dashed $color-grey--dark;
                            border-radius: 1rem;
                            padding: 1rem;
                        }
                    }
                }
                &__cta {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    // background: #d1d1d1;
                    display: flex;
                    justify-content: center;
                    padding: 2rem 0;
                }
            }
            &__form {
                width: 80rem;
                background: #d1d1d1;
                padding: 3rem;
                position: relative;
                border-radius: .5rem;
                transform: translateY(-3rem);
                &.active{
                    transform: translateY(0);
                    position: absolute;
                    bottom: 0;
                    top: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    height: min-content;
                }
            }
        }
    }
}

</style>
