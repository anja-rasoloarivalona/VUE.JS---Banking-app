<template>
    <div class="active__sidenav">
        <ul class="active__sidenav__list" key="dashboard">
                <li class="active__sidenav__list__item"
                    v-for="(item, key) in items"
                    :key="key"
                    :class="{'bg-surfaceColor ': currentTheme && currentTheme.includes('light'), 'bg-on-surfaceColor': currentTheme && currentTheme.includes('dark') }"
                >
                    <div class="active__sidenav__list__item__title">
                        <h2>{{key}}</h2>
                        <div class="active__sidenav__list__item__subtitle">
                            <div>{{item.subtitle}}</div>
                            <div v-if="item.date">{{item.date | short-date}}</div>
                        </div>
                    </div>
                    <div class="active__sidenav__list__item__details">
                        <div class="active__sidenav__list__item__details__amount">${{ item.value | amount}}</div>
                    </div>
                </li>
              </ul>
          <div
            class="active__sidenav__add"
            @click="openBackdrop('transactions')"
            :class="{'bg-surfaceColor ': currentTheme && currentTheme.includes('light'), 'bg-mainColor': currentTheme && currentTheme.includes('dark') }"
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
  created () {
    this.items.upcoming = {
      subtitle: this.upcoming.name,
      date: this.upcoming.date,
      value: this.upcoming.value
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
  computed: {
    ...mapGetters([
      'isUserAuthed',
      'currentAppStatus',

      'userBalance',
      'upcoming',
      'creditBalance',
      'currentTheme'
    ]),
    addButtonBackground () {
      if (this.currentTheme && this.currentTheme.includes('dark')) {
        return 'surface'
      } else {
        return 'primary'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
    &__sidenav {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        &__list {
        list-style: none;
        width: 90%;
        &__item {
            height: 8rem;
            // background: var(--surfaceColor);
            border-radius: 1rem;
            display: flex;
            align-items: center;
            margin-bottom: 3rem;
            padding: 2rem 1rem;
            &.active {
              background: var(--mainColor--dark);
              & * {
                color: var(--surfaceColor)
              }
            }
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
        position: absolute;
        bottom: 5rem;
        left: 0;
        right: 0;
        margin: auto;
        cursor: pointer;
        }
    }
}
</style>
