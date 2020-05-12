<template>
    <div class="setup__view__content" :class="{right: currentSetupStep === 'wallets' || currentSetupStep === 'incomes', left: currentSetupStep === 'goal'}">
        <div class="setup__view__content__main" :class="{expand: user.expenses.length > 0}">
           <h1 class="setup__view__content__main__title">Expenses</h1>
           <div class="setup__view__content__main__details" v-if="user.expenses.length < 1">Now, let's setup your expenses.</div>
           <ul class="setup__view__content__main__list" v-else-if="!showForm">
               <li class="setup__view__content__main__list__item">
                    <div class="setup__view__content__main__list__item--add" @click="showForm = true">
                        <app-icon name="add" size="extra-large" color="grey"/>
                    </div>
                </li>
               <li v-for="(expense, index) in user.expenses" :key="index" class="setup__view__content__main__list__item">
                   <expense :expense="expense" />
               </li>
           </ul>
           <div class="setup__view__content__form active" v-else>
                <expenseForm  @hideForm="hideForm" :isCancelBtnDisplayed="true" :externType="'expense'"/>
            </div>
            <div class="setup__view__content__main__cta" v-if="!showForm && user.expenses.length > 0">
                <app-btn normal warning @click.native="setCurrentSetupStep('incomes')">Previous</app-btn>
                 <app-btn normal primary @click.native="setCurrentSetupStep('goal')">Next</app-btn>
            </div>
        </div>
        <div class="setup__view__content__form" v-if="user.expenses.length < 1">
            <expenseForm  @hideForm="hideForm"></ExpenseForm>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Expense from '@/components/UI/Expense'
import ExpenseForm from '@/components/Forms/ExpenseForm'
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
    ExpenseForm,
    Expense
  }
}
</script>

<style lang="scss">

</style>
