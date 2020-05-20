<template>
  <div class="navContainer" :class="{'not-authed': !isUserAuthed, 'authed': isUserAuthed}">
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
    },
    currentNav () {
      if (this.currentAppStatus.includes('setup')) {
        return 'setup'
      } else {
        return this.currentAppStatus
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
  &.not-authed {
    width: 45vw;
    background: var(--surfaceColor);
    & .nav {
      height: 100%;
      width: 100%;
    }
  }
  &.authed {
    width: 100%;
    display: grid;
    grid-template-columns: 25rem minmax(8rem, 1fr) minmax(70vw, 120rem) minmax(8rem, 1fr);
    grid-template-rows: 9rem;
    justify-items: center;
    & .nav {
        grid-column: 3 / 4;
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
