<template>
    <div class="setup">
        <backdrop v-if="displayBackdrop">
            <transition name="fade" mode="out-in" appear="">
                <welcome v-if="displayWelcome" @hideWelcome="hideWelcome"/>
            </transition>
            <completed v-if="currentAppStatus === 'setup-completed'"/>
        </backdrop>
        <div class="setup__view"  v-else-if="!loading">
            <wallets />
            <incomes />
            <expenses />
            <goal @setup-completed="displayBackdrop = true"/>
        </div>
    </div>
</template>

<script>
import Welcome from './Welcome'
import Wallets from './Wallets'
import Incomes from './Incomes'
import Expenses from './Expenses'
import Goal from './Goal'
import Completed from './Completed'
import { mapGetters } from 'vuex'
import Backdrop from '@/components/Layout/Backdrop/Backdrop'
export default {
  data () {
    return {
      loading: true,
      displayBackdrop: false,
      displayWelcome: false
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'currentAppStatus'
    // 'currentSetupStep'
    ])
  },
  mounted () {
    this.loadWelcome()
    console.log('mounted')
  },
  methods: {
    loadWelcome () {
      setTimeout(() => {
        this.displayBackdrop = true
        this.displayWelcome = true
      }, 1000)
    },
    hideWelcome () {
      this.displayBackdrop = false
      this.displayWelcome = false
      this.loading = false
    }
  },
  components: {
    Welcome,
    Backdrop,
    Wallets,
    Incomes,
    Expenses,
    Goal,
    Completed
  }
}
</script>

<style lang="scss" >
.setup {
    width: 100%;
    max-width: 120rem;
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
                background: var(--surfaceColor);
                border-radius: .5rem;
                padding: 2rem;
                position: relative;
                &.expand {
                    height: 90%;
                }
                &__title {
                    color: var(--mainColor);
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
                            border: 1px dashed var(--textColor--dark);
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
