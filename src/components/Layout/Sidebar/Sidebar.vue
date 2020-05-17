<template>
    <div
      class="sidebar"
      :class="{
        'not-authed': !isUserAuthed,
        'authed': isUserAuthed,
        'bg-surfaceColor': currentTheme.includes('dark'),
        'bg-mainColor': currentTheme.includes('light')
      }">
      <div
       class="sidebar__toprounded bg-default"
       :class="{'bg-mainColor': currentTheme.includes('light'), 'bg-surfaceColor': currentTheme.includes('dark') }">
        <div class="sidebar__toprounded__in"></div>
      </div>
      <template v-if="!isUserAuthed">
          <transition name="fade" mode="out-in" appear>
              <div class="sidebar__authImg">
                  <h1>Take control of your</h1>
                  <h1>Personnal finance</h1>
              </div>
          </transition>
      </template>
      <template v-else>
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
import { mapGetters } from 'vuex'
import Setup from './Setup'
import Active from './Active'
import EditingDashboard from './EditingDashboard'
export default {
  computed: {
    ...mapGetters([
      'isUserAuthed',
      'currentAppStatus',
      'currentTheme',
      'isEditingDashboard'
    ]),
    displayed () {
      if (this.isEditingDashboard) {
        return 'editingDashboard'
      } else {
        if (this.currentAppStatus.includes('setup')) {
          return 'setup'
        } else {
          return this.currentAppStatus
        }
      }
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
  &__toprounded {
    position: absolute;
    top: 0;
    right: -3rem;
    width: 3rem;
    height: 3rem;
    &__in {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-top-left-radius: 4.5rem;
      background: var(--backgroundColor);
      z-index: 1;
    }
  }
  &.not-authed {
      transition: all .5s ease-in;
      width: 55vw;
      background-image: linear-gradient(to right,
              #027a66ea 10%,
              #027a66b4 ),
              url("../../../assets/landing.png") !important;
      background-repeat: no-repeat;
      background-size: cover;
      & .sidebar {
        &__authImg {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding-left: 5rem;
          color: $color-white;
          & h1 {
            font-size: 4rem;
            line-height: 1.4;
          }
        }
      }
  }
  &.authed {
    transition: all .5s ease-in;
    width: 25rem;
    padding: 0 2rem;
    // background: var(--surfaceColor);
    & .sidebar__authImg h1 {
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
