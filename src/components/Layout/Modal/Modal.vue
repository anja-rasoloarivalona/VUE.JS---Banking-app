<template>
        <transition name="fade" appear>
            <div class="modal">
                <div class="modal__close" @click="closeBackdrop">
                    <app-icon name="close" size="large" color="grey"/>
                </div>
                <div class="modal__list" :class="{'bg-grey': currentTheme.includes('light'), 'bg-default': currentTheme.includes('dark') }">
                    <div
                      v-for="view in views"
                      :key="view"
                      class="modal__list__item"
                      :class="{active: modal.active === view || modal.active === 'budget' && budgetForm === view}"
                      @click="changeModalView(view)">
                        {{ view }}
                    </div>
                </div>
                <div class="modal__view" :class="{'bg-surfaceColor': currentTheme.includes('light'), 'bg-on-surfaceColor': currentTheme.includes('dark') }">
                    <h2 class="modal__view__title">{{ modal.active }}</h2>
                    <component :is="modal.active" @hideForm="closeBackdrop"></component>
                </div>
            </div>
        </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Account from './Account'
import Design from './Design'
import Expense from '@/components/Forms/ExpenseForm'
import Ghost from './Ghost'
import Income from '@/components/Forms/IncomeForm'
import Transactions from '@/components/Forms/TransactionsForm'
import Wallet from './Wallet'

export default {
  data () {
    return {
      budgetForm: 'income',
      views: ['account', 'income', 'expense', 'design', 'edit dashboard', 'ghost', 'transactions', 'wallet']
    }
  },
  computed: {
    ...mapGetters([
      'modal',
      'currentTheme'
    ])
  },
  methods: {
    ...mapMutations([
      'setModal',
      'closeBackdrop',
      'setEditDashboardToTrue'
    ]),
    changeModalView (nextView) {
      if (nextView !== 'edit dashboard') {
        return this.setModal(nextView)
      }
      this.setEditDashboardToTrue()
      this.closeBackdrop()
    }
  },
  components: {
    Account,
    Design,
    Expense,
    Ghost,
    Income,
    Transactions,
    Wallet
  }
}
</script>

<style lang="scss" scoped>
.modal {
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
</style>
