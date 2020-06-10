<template>
    <div class="setup__sidenav">
        <ul class="setup__sidenav__list">
          <li
            v-for="(step, index) in setpsList"
            class="setup__sidenav__list__item"
            :class="{active: setup.currentSetupStep === step}"
            :key="step">
            <div class="setup__sidenav__list__item__details">
              <div class="setup__sidenav__list__item__details__title"><h2>Step {{ index + 1}}</h2></div>
              <div class="setup__sidenav__list__item__details__subtitle">{{ step }}</div>
            </div>
          </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'setup'
    ]),
    setpsList () {
      if (this.setup.setupType === 'general') {
        return this.setup.generalSetupSteps
      } else return this.setup.budgetSetupSteps
    }
  }
}
</script>

<style lang="scss" scoped>
.setup {
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
            background: var(--surfaceColor);
            border-radius: 1rem;
            display: flex;
            align-items: center;
            margin-bottom: 3rem;
            padding: 1rem;
            &.active {
              background: var(--mainColor--dark);
              & * {
                color: var(--surfaceColor)
              }
            }
            &__details {
              display: flex;
              flex-direction: column;
              width: 50%;
              &__title {
                & h2 {
                    display: flex;
                    align-items: center;
                    text-transform: capitalize;
                    margin-bottom: 1rem;
                }
              }
              &__subtitle {
                display: flex;
                color: var(--textColor--dark);
                font-size: $font-m;
                text-transform: capitalize;
              }
            }
        }
    }
    }
}
</style>
