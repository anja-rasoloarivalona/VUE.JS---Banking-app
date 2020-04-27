<template>
    <div class="nav">
      <ul class="nav__list">
        <router-link to="/" tag="div"><a>Dashboard</a></router-link>
        <router-link to="/transactions" tag="div"><a>Transactions</a></router-link>
        <router-link to="/budget" tag="div"><a>Budget</a></router-link>
        <router-link to="/wallet" tag="div"><a>Wallet</a></router-link>
        <router-link to="/calendar" tag="div"><a>Calendar</a></router-link>
      </ul>
      <div class="nav__cta">
        <app-icon name="eye" size="large" color="secondary" v-if="!isGhostModeActivated" @click="activateGhostMode"/>
        <app-icon name="eye-blocked" size="large" color="secondary" v-else @click="deactivateGhostMode"/>
        <app-icon name="settings" size="large" :color="isSettingsPannelShowed" @click="openBackdrop('account')"/>
        <app-icon name="user" size="xlarge" color="secondary" @click="showList = !showList"/>
        <div class="nav__cta__list" v-if="showList">
           <div @click="setIsAuthToFalse" class="nav__cta__logout">Logout</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      activePath: null,
      showList: false
    }
  },
  computed: {
    ...mapGetters([
      'backdropState',
      'backdropModal',
      'currentTheme',
      'isGhostModeActivated'
    ]),
    isSettingsPannelShowed () {
      if (this.backdropState && this.backdropModal === 'settings') {
        return 'primary'
      } else return 'secondary'
    }
  },
  watch: {
    $route (to) {
      this.activePath = to.path
    }
  },
  methods: {
    ...mapMutations([
      'openBackdrop',
      'activateGhostMode',
      'deactivateGhostMode',
      'setIsAuthToFalse'
    ])
  },
  mounted () {
    this.activePath = this.$router.currentRoute.path
  }
}
</script>

<style lang="scss" scoped>
.nav {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  max-width: 120rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--on-surfaceColor);
  position: relative;
  z-index: 3;
  margin: 0 1rem;
  &__list {
    display: flex;
    div {
      margin-right: 3rem;
      a {
        color: var(--textColor--dark);
        text-decoration: none;
        font-size: $font-m;
      }
      &.router-link-exact-active a {
            color: var(--mainColor);
      }
    }
  }
  &__cta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 10rem;
      position: relative;
      &__list {
        position: absolute;
        width: 12rem;
        padding: 1.5rem 1rem;
        font-size: $font-m;
        right: -2rem;
        top: 140%;
        background: var(--mainColor);
        border-radius: .5rem;
        &::after {
          content: '';
          position: absolute;
          top: -.5rem;
          right: 2.6rem;
          width: 0;
          height: 0;
          border-left: .5rem solid transparent;
          border-right: .5rem solid transparent;
          border-bottom: .5rem solid var(--mainColor);
        }
      }
      &__logout {
        cursor: pointer;
      }
  }
}
</style>
