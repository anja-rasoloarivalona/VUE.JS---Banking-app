<template>
    <div class="setup__general">
        <currency />
        <wallets />
        <budget />
    </div>
</template>

<script>
import Currency from './Currency/Currency'
import Wallets from './Wallets'
import Budget from './Budget'
export default {
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
}
</style>
