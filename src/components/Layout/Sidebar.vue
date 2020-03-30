<template>
    <div class="sidebar">
        <div class="sidebar__header"></div>
        <transition name="fade" mode="out-in" appear>
            <component
                :is="mode"
            >
            </component>
        </transition>
    </div>
</template>

<script>
import SidebarDashboard from './SidebarDasboard'
import SibebarTransactions from './SidebarTransactions'
export default {
  data () {
    return {
      mode: 'dashboard',

      keys: {
        sidebarbashboard: 1
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.path !== '/') {
        this.mode = to.path.substring(1)
      } else {
        this.mode = 'dashboard'
      }
    }
  },
  components: {
    dashboard: SidebarDashboard,
    transactions: SibebarTransactions
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
    }
    &__list {
        &__item {
            padding: 2rem 1rem;
            border-radius: 1rem;
            background: var(--app-item-bg);
            display: flex;
            align-items: center;
            margin-bottom: 3rem;

            &__title {
                display: flex;
                flex-direction: column;
                & h2 {
                    height: 3rem;
                    display: flex;
                    align-items: center;
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
                width: 100%;
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
