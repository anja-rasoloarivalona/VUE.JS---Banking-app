<template>
    <div class="sidebar"
         :class="{'bg-mainColor': currentTheme.includes('light'), 'bg-surfaceColor': currentTheme.includes('dark') }">
        <div class="sidebar__header">
            <div class="sidebar__header__logo"></div>
        </div>
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
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
    this.items.upcoming = {
      subtitle: this.upcoming.name,
      date: this.upcoming.date,
      value: this.upcoming.value
    }
  },
  computed: {
    ...mapGetters([
      'userBalance',
      'upcoming',
      'creditBalance',
      'currentTheme'
    ]),
    addButtonBackground () {
      if (this.currentTheme.includes('light')) {
        return 'primary'
      } else {
        return 'surface'
      }
    }
  }
}
</script>

<style lang="scss">
.sidebar {
    position: fixed;
    width: 25rem;
    height: 100vh;
    // background: #e4e1e1;
    // background: var(--app-color-main);
    // background: var(--surfaceColor);
    padding: 0 2rem;
    &__header {
        height: 9rem;
        margin-bottom: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &__logo {
            width: 15rem;
            height: 6rem;
            background-image: url('../../assets/logo.png');
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
        }
    }
    &__list {
        list-style: none;
        &__item {
            padding: 2rem 1rem;
            border-radius: 1rem;
            // background: var(--on-surfaceColor);
            display: flex;
            align-items: center;
            margin-bottom: 3rem;

            &__title {
                display: flex;
                flex-direction: column;
                width: 50%;
                & h2 {
                    height: 3rem;
                    display: flex;
                    align-items: center;
                    text-transform: capitalize;
                }
            }
            &__subtitle {
                display: flex;
                color: var(--textColor--dark);
                font-size: $font-s;
                & div:first-child {
                    margin-right: .5rem;
                }
            }
            &__details {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                width: 50%;
                &__amount {
                    font-size: $font-xl;
                    padding-right: 1rem;
                    font-weight: 600;
                }
            }
        }
    }
    &__add {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      // background: var(--mainColor);
      position: absolute;
      bottom: 5rem;
      left: 0;
      right: 0;
      margin: auto;
      cursor: pointer;
    }
}

</style>
