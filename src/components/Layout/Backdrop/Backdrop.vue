<template>
    <div class="backdrop" @click.self="closeBackdrop">
        <transition name="fade" appear>
            <div class="backdrop__modal">
                <div class="backdrop__modal__close" @click="closeBackdrop">
                    <app-icon name="close" size="large" color="grey"/>
                </div>

                <div class="backdrop__modal__list" :class="{'bg-grey': currentTheme.includes('light'), 'bg-default': currentTheme.includes('dark') }">
                    <div
                      v-for="view in views"
                      :key="view"
                      class="backdrop__modal__list__item"
                      :class="{active: mode === view}"
                      @click="changeModalView(view)">
                        {{ view }}
                    </div>
                </div>
                <div class="backdrop__modal__view" :class="{'bg-surfaceColor': currentTheme.includes('light'), 'bg-on-surfaceColor': currentTheme.includes('dark') }">
                      <h2 class="backdrop__modal__view__title">{{ mode }}</h2>
                    <component :is="mode"></component>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Account from './Account'
import Budget from './Budget'
import Design from './Design'
import Ghost from './Ghost'
import TransactionsFrom from '@/components/Forms/TransactionsForm'
import Wallet from './Wallet'
export default {
  data () {
    return {
      mode: 'settings',
      views: ['account', 'budget', 'design', 'edit dashboard', 'ghost', 'transactions', 'wallet']
    }
  },
  computed: {
    ...mapGetters([
      'backdropState',
      'backdropModal',
      'currentTheme'
    ])
  },
  methods: {
    ...mapMutations([
      'closeBackdrop',
      'setModalView',
      'editDashboard'
    ]),
    setBackdropModal () {
      this.mode = this.backdropModal
    },
    changeModalView (nextView) {
      if (nextView !== 'edit dashboard') {
        this.setModalView(nextView)
      } else {
        this.editDashboard()
        this.closeBackdrop()
      }
    }
  },
  watch: {
    backdropModal: {
      handler: 'setBackdropModal',
      immediate: true
    }
  },
  components: {
    account: Account,
    budget: Budget,
    design: Design,
    ghost: Ghost,
    transactions: TransactionsFrom,
    wallet: Wallet
  }
}
</script>

<style lang="scss" scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 10, 10, 0.767);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    &__modal {
        font-size: $font-m;
        border-radius: .5rem;
        overflow: hidden;
        position: relative;
        width: 60vw;
        height: 70vh;
        display: flex;
        &__close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 12;
        }
        &__list {
            width: 17rem;
            // background: var(--backgroundColor);
            &__item {
              height: 5rem;
              margin-bottom: .5rem;
              // background: salmon;
              display: flex;
              align-items: center;
              padding-left: 2rem;
              text-transform: capitalize;
              cursor: pointer;
              transition: all .1s ease-in;
              color: var(--textColor--dark);
              &.active {
                background:var(--mainColor);
                color: $color-white
              }
            }
        }
        &__view {
          // background: var(--on-surfaceColor);
          flex: 1;
          padding: 0 3rem;
          position: relative;
          &__title {
            height: 5rem;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            text-transform: capitalize;
            color: var(--textColor--dark)
          }
        }
    }
}
</style>
