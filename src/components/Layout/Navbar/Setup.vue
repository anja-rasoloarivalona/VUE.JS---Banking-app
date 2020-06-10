<template>
    <div class="setup">
        <ul class="setup__list">
            <div class="setup__list__item" v-if="setup.currentSetupStep !== 'currency'" @click="clickBack">Back</div>
        </ul>
        <div class="setup__cta">
          <profile-toggler />
          <lang-switcher />
        </div>
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import LangSwitcher from './components/LangSwitcher/LangSwitcher'
import ProfileToggler from './components/ProfileToggler/ProfileToggler'

export default {
  data () {
    return {
      logoutHovered: false
    }
  },
  computed: {
    ...mapGetters([
      'setup'
    ]),
    logoutColor () {
      if (this.logoutHovered) {
        return 'white'
      } else {
        return 'primary'
      }
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentSetupStep'
    ]),
    clickBack () {
      const stepsData = this.setup.setupType === 'general' ? this.setup.generalSetupSteps : this.setup.budgetSetupSteps
      stepsData.find((step, index) => {
        if (step === this.setup.currentSetupStep) {
          const previousStep = stepsData[index - 1]
          this.setCurrentSetupStep(previousStep)
        }
      })
    }
  },
  components: {
    LangSwitcher,
    ProfileToggler
  }
}
</script>

<style lang="scss" scoped>
.setup {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    width: 100%;
    max-width: 120rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__list {
        display: flex;
        &__item {
          font-size: $font-m;
          color: var(--mainColor);
          margin-right: 3rem;
          cursor: pointer;
        }
    }
    &__cta {
        font-size: $font-m;
        color: var(--mainColor);
        // background: red;
        display: flex;
        align-items: center;
    }
}
</style>
