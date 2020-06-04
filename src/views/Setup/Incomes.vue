<template>
    <div class="setup__view__content" :class="{right: currentSetupStep === 'wallets', left: currentSetupStep === 'expenses' || currentSetupStep === 'goal'}">
        <div class="setup__view__content__main" :class="{expand: user.incomes.length > 0}">
           <div class="setup__view__content__main__title">
             <h1>Incomes</h1>
             <div class="setup__view__content__main__title__add" @click="openBackdrop('income')">
                 <app-icon name="add" size="large" color="white"/>
             </div>
           </div>
           <template v-if="user.incomes.length < 1">
              <div class="setup__view__content__main__details" >
                    Now, let's setup your incomes.
              </div>
              <div class="setup__view__content__form" v-if="user.incomes.length < 1">
                  <income-form @hideForm="hideForm"></income-form>
              </div>
           </template>
           <income-table v-else :incomes="user.incomes"/>
           <div class="setup__view__content__nav">
              <app-btn normal secondary @click.native="setCurrentSetupStep('wallets')">Previous</app-btn>
              <app-btn normal primary @click.native="setCurrentSetupStep('expenses')">Next</app-btn>
           </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import IncomeTable from '@/components/UI/Income/IncomeTable'
import IncomeForm from '@/components/Forms/IncomeForm'
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
      'setCurrentSetupStep',
      'openBackdrop'
    ]),
    hideForm () {
      this.showForm = false
    }
  },
  components: {
    IncomeForm,
    IncomeTable
  }
}
</script>

<style lang="scss">

</style>
