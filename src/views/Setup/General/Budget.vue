<template>
    <div class="setup__view__content setup-budget"
        :class="{
            right: ['wallets', 'currency'].includes(setup.currentSetupStep),
            left: ['incomes', 'expenses', 'goal'].includes(setup.currentSetupStep)
        }">
        <div class="setup__view__content__imgContainer">
             <app-icon name="budget" size="xxl" />
        </div>
        <div class="setup__view__content__title">
            <b>{{$t('setYourBudget')}}</b>
        </div>
        <div class="setup__view__content__text">
            <div>{{$t('byPlanningYourBudgetYouWillhaveMoreControl')}}</div>
        </div>
        <div class="setup__view__content__cta">
            <app-btn normal secondary @click.native="finishSetup">{{$t('later')}}</app-btn>
            <app-btn normal primary @click.native="startSetBudget">{{$t('setBudget')}}</app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
    ...mapActions([
      'finishSetup'
    ]),
    startSetBudget () {
      this.setSetupType('budget')
      this.setCurrentSetupStep('incomes')
    }
  }
}
</script>

<style lang="scss" scoped>
.setup-budget {
  & .setup__view__content__text {
    margin-top: 0;
    margin-bottom: 3rem;
  }
}
</style>
