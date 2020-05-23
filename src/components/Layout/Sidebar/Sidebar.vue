<template>
    <div class="sidebar" :class="{'not-authed': !auth.isAuth, 'authed': auth.isAuth, 'bg-mainColor': theme.isLight, 'bg-surfaceColor': theme.isDark}">

      <template v-if="!auth.isAuth">
              <div class="sidebar__authImg full-absolute">
                  <div class="sidebar__authImg__bg full-absolute"></div>
                  <!-- <transition name="fade" mode="out-in" appear> -->
                    <div class="sidebar__authImg__content full-absolute">
                      <h1>Take control of your</h1>
                      <h1>Personnal finance</h1>
                    </div>
                  <!-- </transition> -->
                  <div
                    class="sidebar__authImg__layer full-absolute"
                    :style="{backgroundImage: `linear-gradient(to bottom left, rgb(29, 29, 29) 10%, #1b1b1b6b )`}"
                  >
                  </div>
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
// import themes from '@/assets/theme'
import { mapGetters } from 'vuex'
import Setup from './Setup'
import Active from './Active'
import EditingDashboard from './EditingDashboard'
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
      if (this.dashboard.isBeingEdited) {
        return 'editingDashboard'
      } else {
        if (this.auth.appStatus.includes('setup')) {
          return 'setup'
        } else {
          return this.auth.appStatus
        }
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
    EditingDashboard
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
      & .sidebar {
        &__authImg {
          z-index: 1;
          &__bg {
            z-index: 2;
            background: var(--mainColor);
          }
          &__content {
            display: flex;
            justify-content: center;
            flex-direction: column;
            background-image: url("../../../assets/landing.png");
            background-repeat: no-repeat;
            background-size: cover;
            z-index: 3;
            padding-left: 5rem;
            color: $color-white;
          }
          &__layer {
            background-image: linear-gradient(to bottom left,
              var(--surfaceColor) 10%,
            #1b1b1b6b );
            z-index: 4;
          }
          & h1 {
            font-size: 4rem;
            line-height: 1.4;
          }
        }
      }
  }
  &.authed {
    width: 25rem;
    padding: 0 2rem;
    background: var(--surfaceColor);
    & .sidebar__authImg h1 {
      // opacity: 0;
    }
    & .sidebar__authImg__content {
      display: none;
      opacity: 0;
    }
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
