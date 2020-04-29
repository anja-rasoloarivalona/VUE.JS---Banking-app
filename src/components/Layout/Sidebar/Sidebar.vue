<template>
    <div class="sidebar" :class="{'not-authed': !isUserAuthed, 'authed': isUserAuthed}">
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
              <setup />
          </transition>
      </template>

        <!-- <div class="sidebar__header">
            <div class="sidebar__header__logo"></div>
        </div>
        <template v-if="!isEditingDashboard">
          <transition name="fade" mode="out-in" appear>
              <ul class="sidebar__list" key="dashboard">
                <li class="sidebar__list__item"
                    v-for="(item, key) in items"
                    :key="key"
                    :class="{'bg-surfaceColor ': currentTheme.includes('light'), 'bg-on-surfaceColor': currentTheme.includes('dark') }"
                >
                    <div class="sidebar__list__item__title">
                        <h2>{{key}}</h2>
                        <div class="sidebar__list__item__subtitle">
                            <div>{{item.subtitle}}</div>
                            <div v-if="item.date">{{item.date | short-date}}</div>
                        </div>
                    </div>
                    <div class="sidebar__list__item__details">
                        <div class="sidebar__list__item__details__amount">${{ item.value | amount}}</div>
                    </div>
                </li>
              </ul>
          </transition>

          <div
            class="sidebar__add"
            @click="openBackdrop('transactions')"
            :class="{'bg-surfaceColor ': currentTheme.includes('light'), 'bg-mainColor': currentTheme.includes('dark') }"
          >
              <app-icon name="add" size="xxl" :color="addButtonBackground"></app-icon>
          </div>
        </template>
        <template v-else>
            <transition name="fade" mode="out-in" appear>
                <editing-dashboard />
            </transition>
        </template> -->
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Setup from './Setup'
// import EditingDashboard from './EditingDashboard'
export default {
  data () {
    return {
      items: {
        balance: {
          subtitle: 'Available',
          value: 0
        },
        upcoming: null,
        credit: {
          subtitle: 'Used',
          value: 0
        },
        budget: {
          subtitle: 'Remaining',
          value: 400
        }
      }
    }
  },
  watch: {
    userBalance: {
      immediate: true,
      handler (balance) {
        this.items.balance.value = balance
      }
    },
    creditBalance: {
      immediate: true,
      handler (credit) {
        this.items.credit.value = credit
      }
    }
  },
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

      'userBalance',
      'upcoming',
      'creditBalance',
      'currentTheme',
      'isEditingDashboard'
    ]),
    addButtonBackground () {
      if (this.currentTheme.includes('light')) {
        return 'primary'
      } else {
        return 'surface'
      }
    }
  },
  components: {
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
    background: var(--mainColor);
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
