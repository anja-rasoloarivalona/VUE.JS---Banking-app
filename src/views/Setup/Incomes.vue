<template>
    <div class="setup__view__content" :class="{right: currentSetupStep === 'wallets', left: currentSetupStep === 'expenses' || currentSetupStep === 'goal'}">
        <div class="setup__view__content__main" :class="{expand: user.incomes.length > 0}">
           <h1 class="setup__view__content__main__title">Incomes</h1>
           <div class="setup__view__content__main__details" v-if="user.incomes.length < 1">Now, let's setup your incomes.</div>
           <ul class="setup__view__content__main__list" v-else-if="!showForm">
               <li class="setup__view__content__main__list__item">
                    <div class="setup__view__content__main__list__item--add" @click="showForm = true">
                        <app-icon name="add" size="extra-large" color="grey"/>
                    </div>
                </li>
               <li v-for="(income, index) in user.incomes" :key="index" class="setup__view__content__main__list__item">
                   <income :income="income" />
               </li>
           </ul>
           <div class="setup__view__content__form active" v-else>
                <budget-form  @hideForm="hideForm" :editedWallet="editedWallet" :isCancelBtnDisplayed="true"/>
            </div>
            <div class="setup__view__content__main__cta" v-if="!showForm && user.wallets.length > 0">
                <app-btn normal warning @click.native="setCurrentSetupStep('wallets')">Previous</app-btn>
                 <app-btn normal primary @click.native="setCurrentSetupStep('expenses')">Next</app-btn>
            </div>
        </div>
        <div class="setup__view__content__form" v-if="user.incomes.length < 1">
            <budget-form :externType="'income'" @hideForm="hideForm"></budget-form>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Income from '@/components/UI/Income'
import BudgetForm from '@/components/Forms/BudgetForm'
export default {
  data () {
    return {
      showForm: false
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'currentSetupStep'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentSetupStep'
    ]),
    hideForm () {
      this.showForm = false
    }
  },
  components: {
    BudgetForm,
    Income
  }
}
</script>

<style lang="scss">

</style>
