<template>
    <div class="backdrop" @click.self="closeBackdrop">
        <transition name="fade" appear>
            <div class="backdrop__modal">
                <div class="backdrop__modal__close" @click="closeBackdrop">
                    <app-icon name="close" size="large" color="grey"/>
                </div>

                <div class="backdrop__modal__list">
                    <div
                      v-for="view in views"
                      :key="view"
                      class="backdrop__modal__list__item"
                      :class="{active: mode === view}"
                      @click="setModalView(view)">
                        {{ view }}
                    </div>
                </div>
                <div class="backdrop__modal__view">
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
      views: ['account', 'budget', 'design', 'ghost', 'transactions', 'wallet']
    }
  },
  computed: {
    ...mapGetters([
      'backdropState',
      'backdropModal'
    ])
  },
  methods: {
    ...mapMutations([
      'closeBackdrop',
      'setModalView'
    ]),
    setBackdropModal () {
      this.mode = this.backdropModal
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
        background: var(--backgroundColor);
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
            // padding-top: 2rem;
            // background: red;
            width: 17rem;
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
              &.active {
                background:var(--mainColor);
              }
            }
        }
        &__view {
          background: var(--on-surfaceColor);
          flex: 1;
          padding: 0 3rem;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            display: none !important;
          }
          &__title {
            height: 5rem;
            display: flex;
            align-items: center;
            text-transform: capitalize;
            color: var(--textColor--dark)
            // font-size: $font-xl;
          }
        }
    }
}
</style>
