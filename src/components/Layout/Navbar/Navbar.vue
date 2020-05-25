<template>
  <div class="navContainer" :class="{'not-authed': !auth.isAuth, 'authed': auth.isAuth, 'reset-password': auth.isResettingPassword}">
    <div class="navContainer__toprounded"
         :class="{
        'bg-mainColor': theme.isLight && auth.isAuth,
        'bg-dark': theme.isLight && !auth.isAuth
      }">
      <div class="navContainer__toprounded__inner"></div>
    </div>
    <div class="nav bg-default">
      <transition name="fade-from-top" mode="out-in">
          <component :is="currentNav"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Auth from './Auth'
import Setup from './Setup'
import Active from './Active'
export default {
  data () {
    return {
      activePath: null,
      showList: false
    }
  },
  computed: {
    ...mapGetters([
      'theme',
      'auth',
      'backdrop',
      'isGhostModeActivated'
    ]),
    isSettingsPannelShowed () {
      if (this.backdrop.isDisplayed && this.backdrop.active === 'settings') {
        return 'primary'
      } else return 'secondary'
    },
    currentNav () {
      if (this.auth.appStatus.includes('setup')) {
        return 'setup'
      } else {
        return this.auth.appStatus
      }
    }
  },
  watch: {
    $route (to) {
      this.activePath = to.path
    }
  },
  methods: {
    ...mapMutations([
      'activateGhostMode',
      'deactivateGhostMode',
      'setIsAuthToFalse'
    ])
  },
  mounted () {
    this.activePath = this.$router.currentRoute.path
  },
  components: {
    Active,
    Auth,
    Setup
  }
}
</script>

<style lang="scss" scoped>
.navContainer {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 3;
  height: 9rem;
  transition: all .5s ease-in;
  &__toprounded {
    position: absolute;
    left: 0;
    top: 0;
    height: 9rem;
    width: 5rem;
    background: var(--surfaceColor);
    z-index: 4;
    &__inner {
      background: var(--backgroundColor);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-top-left-radius: 2rem;
      z-index: 5;
    }
  }
  &.not-authed {
    width: 45vw;
    background: var(--surfaceColor);
    border-radius: 2rem;
    & .nav {
      height: 100%;
      width: 100%;
    }
    &.reset-password {
      width: 105vw
    }
  }
  &.authed {
    width: calc(100% - 25rem);
    display: grid;
    grid-template-columns: minmax(8rem, 1fr) minmax(70vw, 120rem) minmax(8rem, 1fr);
    grid-template-rows: 9rem;
    justify-items: center;
    & .nav {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        width: calc(100% - 2rem);
        max-width: 118rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--lineColor);
        position: relative;
        z-index: 3;
        margin: 0 1rem;
    }
  }
}
</style>
