<template>
    <div class="backdrop" @click.self="closeBackdrop">
      <slot />
      <transition name="fade" mode="out-in" appear>
        <component :is="backdrop.active"></component>
      </transition>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Transactions from './Transactions'
import Settings from './Settings/Settings'
import Income from './Income'
import Expense from './Expense'
export default {
  methods: {
    ...mapMutations([
      'closeBackdrop'
    ])
  },
  computed: {
    ...mapGetters([
      'backdrop'
    ])
  },
  components: {
    Transactions,
    Settings,
    Income,
    Expense
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
