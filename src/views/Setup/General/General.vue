<template>
    <div class="setup__general">
        <currency />
        <wallets />
        <budget v-if="setup.setupType !== 'budget'"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Currency from './Currency/Currency'
import Wallets from './Walleta'
import Budget from './Budget'
export default {
  computed: {
    ...mapGetters([
      'setup'
    ])
  },
  components: {
    Currency,
    Wallets,
    Budget
  }
}
</script>

<style lang="scss" scoped>
.setup__general {
    // background: red;
    width:100%;
    height: 100%;
     position: absolute;
    top: 0;
    left: 0;
}
</style>
