<template>
  <div class="navContainer" :class="{'not-authed': !isUserAuthed, 'authed': isUserAuthed}">
    <div class="navBg" :class="{'bg-mainColor': currentTheme && currentTheme.includes('light'), 'bg-surfaceColor': currentTheme && currentTheme.includes('dark') }">
      <div class="navBg__in"></div>
    </div>
    <div class="nav">
      <transition name="fade-from-top" mode="out-in">
          <component :is="currentAppStatus"></component>
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
      'isUserAuthed',
      'currentAppStatus',
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
  // background: red;
  right: 0;
  top: 0;
  z-index: 3;
  height: 9rem;
  &.not-authed {
    width: 45vw;
    & .navBg {
      opacity: 0;
    }
    & .nav {
      height: 100%;
      width: 100%;
      // background: blue;
    }
  }
  &.authed {
    width: 100%;
    display: grid;
    grid-template-columns: 25rem minmax(8rem, 1fr) minmax(70vw, 120rem) minmax(8rem, 1fr);
    grid-template-rows: 9rem;
    & .nav {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
        max-width: 120rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid $color-line;
        position: relative;
        z-index: 3;
        margin: 0 1rem;
    }
    .navBg {
      grid-column: 2 / -1;
      grid-row: 1 / 2;
      position: relative;
      z-index: 2;
      background: $color-primary;
      &__in {
        background: $color-white;
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 1;
        border-top-left-radius: 4rem;
      }
    }
  }
}
</style>
