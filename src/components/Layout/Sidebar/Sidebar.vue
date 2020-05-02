<template>
    <div
      class="sidebar"
      :class="{
        'not-authed': !isUserAuthed,
        'authed': isUserAuthed,
        'bg-surfaceColor': currentTheme && currentTheme.includes('dark'),
        'bg-mainColor': currentTheme && currentTheme.includes('light')
      }">
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
           <component :is="currentAppStatus"></component>
          </transition>
      </template>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Setup from './Setup'
import Active from './Active'
// import EditingDashboard from './EditingDashboard'
export default {
  methods: {
    ...mapMutations([
      'openBackdrop'
    ])
  },
  created () {
    // this.items.upcoming = {
    //   subtitle: this.upcoming.name,
    //   date: this.upcoming.date,
    //   value: this.upcoming.value
    // }
  },
  computed: {
    ...mapGetters([
      'isUserAuthed',
      'currentAppStatus',
      'currentTheme'
    ])
  },
  components: {
    Active,
    Setup
    // 'editing-dashboard': EditingDashboard
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
  &.not-authed {
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
    width: 25rem;
    padding: 0 2rem;
    // background: var(--surfaceColor);
    & .sidebar__authImg h1 {
      opacity: 0;
    }
  }

    // position: fixed;
    // width: 25rem;
    // height: 100vh;
    // padding: 0 2rem;
    // &__header {
    //     height: 9rem;
    //     margin-bottom: 3rem;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     &__logo {
    //         width: 15rem;
    //         height: 6rem;
    //         background-image: url('../../../assets/logo.png');
    //         background-position: center;
    //         background-size: contain;
    //         background-repeat: no-repeat;
    //     }
    // }
    // &__list {
    //     list-style: none;
    //     &__item {
    //         padding: 2rem 1rem;
    //         border-radius: 1rem;
    //         // background: var(--on-surfaceColor);
    //         display: flex;
    //         align-items: center;
    //         margin-bottom: 3rem;

    //         &__title {
    //             display: flex;
    //             flex-direction: column;
    //             width: 50%;
    //             & h2 {
    //                 height: 3rem;
    //                 display: flex;
    //                 align-items: center;
    //                 text-transform: capitalize;
    //             }
    //         }
    //         &__subtitle {
    //             display: flex;
    //             color: var(--textColor--dark);
    //             font-size: $font-s;
    //             & div:first-child {
    //                 margin-right: .5rem;
    //             }
    //         }
    //         &__details {
    //             display: flex;
    //             align-items: center;
    //             justify-content: flex-end;
    //             width: 50%;
    //             &__amount {
    //                 font-size: $font-xl;
    //                 padding-right: 1rem;
    //                 font-weight: 600;
    //             }
    //         }
    //     }
    // }
    // &__add {
    //   width: 8rem;
    //   height: 8rem;
    //   border-radius: 50%;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   // background: var(--mainColor);
    //   position: absolute;
    //   bottom: 5rem;
    //   left: 0;
    //   right: 0;
    //   margin: auto;
    //   cursor: pointer;
    // }
}

</style>
