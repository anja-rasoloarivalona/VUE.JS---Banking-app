<template>
    <div class="sidebar">
        <div class="sidebar__header">
            <div class="sidebar__header__logo"></div>
        </div>
        <transition name="fade" mode="out-in" appear>
            <ul class="sidebar__list" key="dashboard">
              <li class="sidebar__list__item" v-for="(item, key) in items" :key="key">
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  created () {
    // console.log(this.$store.state.user.balance)
    // this.items.credit.value = this.creditBalance
    // this.items.balance.value = this.userBalance
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
      'creditBalance'
    ])
  }
}
</script>

<style lang="scss">
.sidebar {
    position: fixed;
    width: 25rem;
    height: 100vh;
    background: var(--app-bg-secondary);
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
            background: var(--app-item-bg);
            background-image: var(--app-item-bg-gradient);
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
                color: var(--app-title-color-secondary);
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
}

.fade-enter-active {
    animation: fade-in .5s ease-out forwards;
}
.fade-leave-active {
    animation: fade-out .5s ease-out forwards;
}

@keyframes fade-in {
    from {
        transform: translateY(2rem);
        opacity: 0;
    }
    to {
        transform: translateY(0rem);
        opacity: 1;
    }
}

@keyframes fade-out {
    from {
        transform: translateY(0rem);
        opacity: 1;
    }
    to {
        transform: translateY(2rem);
        opacity: 0;
    }
}

</style>
