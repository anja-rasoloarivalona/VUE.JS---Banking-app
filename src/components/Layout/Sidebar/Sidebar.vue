<template>
    <div class="sidebar"
    :class="{
      'not-authed': !auth.isAuth,
      'authed': auth.isAuth,
      'bg-mainColor': theme.isLight && auth.isAuth,
      'bg-surfaceColor': theme.isDark,
      'reset-password': auth.isResettingPassword
    }">
      <template v-if="!auth.isAuth">
              <div class="sidebar__quotes">
                  <quotes />
              </div>
      </template>
      <template v-else-if="notDelayed">
        <div class="sidebar__content">
          <div class="sidebar__content__header">
            <div class="sidebar__content__header__logo"></div>
          </div>
          <transition name="fade" mode="out-in" appear>
              <component :is="displayed"></component>
          </transition>
        </div>
      </template>
    </div>
</template>

<script>
import Quotes from './Quotes'
import { mapGetters } from 'vuex'
import Setup from './Setup'
import Active from './Active'
// import EditingDashboard from './EditingDashboard'
export default {
  data () {
    return {
      notDelayed: true
    }
  },
  computed: {
    ...mapGetters([
      'theme',
      'auth',
      'dashboard'
    ]),
    displayed () {
      if (this.auth.appStatus.includes('setup')) {
        return 'setup'
      } else {
        return this.auth.appStatus
      }
    }
  },
  mounted () {
    if (!this.auth.isAuth) {
      console.log('setting to false')
      this.notDelayed = false
    }
  },
  watch: {
    'auth.isAuth': function (auth) {
      if (auth) {
        setTimeout(() => this.setNotDelayedToTrue(), 1200)
      } else {
        this.notDelayed = false
      }
    }
  },
  methods: {
    setNotDelayedToTrue () {
      this.notDelayed = true
    }
  },
  components: {
    Active,
    Setup,
    Quotes
    // EditingDashboard
  }
}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  transition: all .5s ease-in;
  z-index: 9;
  // &__authImg__content {
  //   transition: all .5s ease-in;
  // }

  &.not-authed {
      width: 55vw;
      background: rgb(29, 29, 29);
      & .sidebar {
        position: relative;
        &__quotes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
      }
      &.reset-password {
        width: 0vw;
      }
  }
  &.authed {
    width: 25rem;
    padding: 0 2rem;
    // background: var(--surfaceColor);
  }
  &__content {
    height: 100%;
    width: 100%;
    &__header {
      height: 9rem;
      margin-bottom: 3rem;
      display: flex;
      align-items: center;
        justify-content: center;
        &__logo {
            width: 15rem;
            height: 6rem;
            background-image: url('../../../assets/logo.png');
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
          }
    }
  }
}

</style>
