<template>
    <div class="setup">
        <ul class="setup__list">
            <div class="setup__list__item" @click="setCurrentSetupStep('wallets')">Wallets</div>
            <div class="setup__list__item" v-if="user.wallets.length > 0" @click="setCurrentSetupStep('incomes')">Incomes</div>
            <div class="setup__list__item" v-if="user.incomes.length > 0" @click="setCurrentSetupStep('expenses')">Expenses</div>
        </ul>
        <div class="setup__cta">
          <div class="setup__cta__logout" @mouseenter="logoutHovered = true" @mouseleave="logoutHovered = false" @click="setIsAuthToFalse">
              <div>Logout</div>
              <app-icon name="logout" size="large" :color="logoutColor" />
          </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      logoutHovered: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    logoutColor () {
      if (this.logoutHovered) {
        return 'white'
      } else {
        return 'primary'
      }
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentSetupStep',
      'setIsAuthToFalse'
    ])
  }
}
</script>

<style lang="scss" scoped>
.setup {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    width: 100%;
    max-width: 120rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__list {
        display: flex;
        &__item {
          font-size: $font-m;
          color: var(--mainColor);
          margin-right: 3rem;
          cursor: pointer;
        }
    }
    &__cta {
        font-size: $font-m;
        color: var(--mainColor);
        &__logout {
          cursor: pointer;
          transition: all .3s ease-in;
          border-radius: .5rem;
          display: flex;
          align-items: center;
          padding: 1rem 2rem;
          & div {
            margin-right: 1rem;
          }
          &:hover {
            background: var(--mainColor);
            color: var(--surfaceColor);
          }
        }
    }
}
</style>
