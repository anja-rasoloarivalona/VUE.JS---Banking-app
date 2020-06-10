<template>
    <div class="setup__view__content"
        :class="{
            right: ['wallets', 'currency'].includes(setup.currentSetupStep),
            left: ['incomes', 'expenses', 'goal'].includes(setup.currentSetupStep)
        }">
        <div class="setup__view__content__imgContainer">
             <app-icon name="budget" size="xxl" />
        </div>
        <div class="setup__view__content__title">
            <b>Set your budget</b>
        </div>
        <div class="setup__view__content__text">
            <div>Your reference currency should be the one you use on a daily basis.</div>
            <div>Your balance and statistics will be displayed in that currency.</div>
        </div>
        <div class="setup__view__content__cta">
            <app-btn normal secondary>Later</app-btn>
            <app-btn normal primary @click.native="startSetBudget">Set budget</app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'setup'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentSetupStep',
      'setSetupType'
    ]),
    startSetBudget () {
      this.setSetupType('budget')
      this.setCurrentSetupStep('incomes')
    }
  }
}
</script>

<style lang="scss" scoped>
.budget__cta {
    margin-top: 3rem;
    font-size: $font-m;
    color: var(--mainColor);
    background: transparent;
    padding: 1rem 2rem;
    border-radius: .5rem;
    justify-self: center;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
}
</style>
