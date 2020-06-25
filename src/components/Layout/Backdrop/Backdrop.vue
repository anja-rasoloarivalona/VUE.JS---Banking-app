<template>
    <div class="backdrop" @click.self="close">
      <slot />
      <transition name="fade" mode="out-in" appear>
        <component :is="backdrop.active"></component>
      </transition>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Transactions from './Transactions'
import Income from './Income'
import Expense from './Expense'
import Wallet from './Wallet'
export default {
  methods: {
    ...mapMutations([
      'closeBackdrop',
      'resetEditTransaction'
    ]),
    close () {
      this.closeBackdrop()
      this.resetEditTransaction()
    }
  },
  computed: {
    ...mapGetters([
      'backdrop'
    ])
  },
  components: {
    Transactions,
    Income,
    Expense,
    Wallet
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
}
</style>
