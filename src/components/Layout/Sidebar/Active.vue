<template>
    <div class="active__sidenav">
         <ul class="active__sidenav__list" key="dashboard">
                <li class="active__sidenav__list__item"
                    v-for="(item, key) in items"
                    :key="key"
                    :class="{'bg-surfaceColor ':  theme.isLight, 'bg-on-surfaceColor': theme.isDark}">
                    <div class="active__sidenav__list__item__title">
                        <h2>{{$t(key)}}</h2>
                        <div class="active__sidenav__list__item__subtitle">
                            <div>{{$t(item.subtitle)}}</div>
                            <div v-if="item.date">{{item.date | short-date}}</div>
                        </div>
                    </div>
                    <div class="active__sidenav__list__item__details">
                        <div class="active__sidenav__list__item__details__amount">
                          <span v-if="item.value > 0">{{ item.value | amount}}</span>
                          <span v-else>-</span>
                        </div>
                    </div>
                </li>
          </ul>
          <div
            class="active__sidenav__add"
            @click="openBackdrop('transactions')"
            :class="{'bg-secondaryColor':  theme.isLight, 'bg-mainColor': theme.isDark}"
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
          subtitle: 'current',
          value: 0
        },
        credit: {
          subtitle: 'used',
          value: 0
        },
        budget: {
          subtitle: 'remaining',
          value: 0
        }
      }
    }
  },
  watch: {
    user: {
      immediate: true,
      deep: true,
      handler () {
        if (this.upcoming) {
          const subtitle = this.upcoming.type === 'expense' ? this.expensesList[this.upcoming.category].subcategory[this.upcoming.subcategory].i18 : this.incomesList.category[this.upcoming.subcategory].i18
          const data = { ...this.items }
          data.upcoming = {
            subtitle: subtitle,
            value: this.upcoming.value
          }
          this.items = data
        } else {
          const data = { ...this.items }
          delete data.upcoming
          this.items = data
        }
      }
    },
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
    },
    'user.expenses': {
      immediate: true,
      deep: true,
      handler (expenses) {
        let remaining = 0
        this.user.expenses.forEach(expense => {
          if (expense.expenseType === 'Variable' && expense.amount > expense.used) {
            remaining += (expense.amount - expense.used)
          }
        })
        this.items.budget.value = remaining
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
      'theme',
      'user',
      'userBalance',
      'upcoming',
      'creditBalance',
      'expensesList',
      'incomesList'
    ]),
    addButtonBackground () {
      if (this.theme.isDark) {
        return 'surface'
      } else {
        return 'white'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
    &__sidenav {
        width: 100%;
        height: 72%;
        display: flex;
        padding-top: 1rem;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
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
                    max-width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            &__details {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              width: 50%;
              &__amount {
                    font-size: $font-m;
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
        // transform: translateY(-8rem);
        // position: absolute;
        // bottom: 5rem;
        // left: 0;
        // right: 0;
        // margin: auto;
        cursor: pointer;
        }
    }
}
</style>
