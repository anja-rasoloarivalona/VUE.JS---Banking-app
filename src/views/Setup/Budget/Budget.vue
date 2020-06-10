<template>
    <div class="setup__budget" :class="{
      right: ['currency', 'wallets'].includes(setup.currentSetupStep)
    }">
        <incomes />
        <expenses />
        <goal />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Expenses from './Expenses'
import Incomes from './Incomes'
import Goal from './Goal'

export default {
  computed: {
    ...mapGetters([
      'setup'
    ])
  },
  components: {
    Expenses,
    Incomes,
    Goal
  }
}
</script>

<style lang="scss" scoped>
.setup__budget {
    width:100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
     transition: all .5s ease-in;
    &.right {
      transform: translateX(100vw);
    }
}
</style>
