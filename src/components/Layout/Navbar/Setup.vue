<template>
    <div class="setup">
        <ul class="setup__list">
            <div class="setup__list__item" @click="setCurrentSetupStep('wallets')">Wallets</div>
            <div class="setup__list__item" v-if="user.wallets.length > 0" @click="setCurrentSetupStep('incomes')">Incomes</div>
            <div class="setup__list__item" v-if="user.incomes.length > 0" @click="setCurrentSetupStep('expenses')">Expenses</div>
        </ul>
        <div class="setup__cta">Logout</div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentSetupStep'
    ])
  }
}
</script>

<style lang="scss" scoped>
.setup {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    max-width: 120rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__list {
        display: flex;
        &__item {
          font-size: $font-m;
          color: $color-primary;
          margin-right: 3rem;
          cursor: pointer;
        }
    }
    &__cta {
        cursor: pointer;
        transition: all .2s ease-in;
        font-size: $font-m;
        color: $color-primary;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
