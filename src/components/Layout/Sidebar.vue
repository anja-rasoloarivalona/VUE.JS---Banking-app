<template>
    <div class="sidebar">
        <div class="sidebar__header"></div>
        <transition name="fade" mode="out-in" appear>
            <ul class="sidebar__list" key="dashboard">
              <li class="sidebar__list__item">
                  <div class="sidebar__list__item__title">
                      <h2>Upcoming</h2>
                      <div class="sidebar__list__item__subtitle">
                          <div>Rent</div>
                          <div>4/01/2020</div>
                      </div>
                  </div>
                  <div class="sidebar__list__item__details">
                      <div class="sidebar__list__item__details__amount">$640</div>
                  </div>
              </li>
              <li class="sidebar__list__item">
                  <div class="sidebar__list__item__title">
                      <h2>Credit</h2>
                      <div class="sidebar__list__item__subtitle">
                          <div>Available</div>
                      </div>
                  </div>
                  <div class="sidebar__list__item__details">
                      <div class="sidebar__list__item__details__amount">$150</div>
                  </div>
              </li>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
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
        list-style: none;
        // background: red;
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
