<template>
    <div
      class="sidebar"
      :class="{
        'not-authed': !isUserAuthed,
        'authed': isUserAuthed,
        'bg-surfaceColor': currentTheme && currentTheme.includes('dark'),
        'bg-mainColor': currentTheme && currentTheme.includes('light')
      }"
      >
      <template v-if="!isUserAuthed">
          <transition name="fade" mode="out-in" appear>
              <div class="sidebar__authImg">
                  <h1>Take control of your</h1>
                  <h1>Personnal finance</h1>
              </div>
          </transition>
      </template>
      <template v-else>
         <transition name="fade" mode="out-in" appear>
           <component :is="displayed"></component>
          </transition>
      </template>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Setup from './Setup'
import Active from './Active'
import EditingDashboard from './EditingDashboard'
export default {
  methods: {
    ...mapMutations([
      'openBackdrop'
    ])
  },
  computed: {
    ...mapGetters([
      'isUserAuthed',
      'currentAppStatus',
      'currentTheme',
      'isEditingDashboard'
    ]),
    displayed () {
      if (!this.isEditingDashboard) {
        return this.currentAppStatus
      } else {
        return 'editingDashboard'
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
  &.not-authed {
      transition: all .5s ease-in;
      width: 55vw;
      background-image: linear-gradient(to right,
              #027a66ea 10%,
              #027a66b4 ),
              url("../../../assets/landing.png");
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
}

</style>
