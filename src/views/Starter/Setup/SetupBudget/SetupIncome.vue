<template>
    <div class="setup-income">
        <div class="setup-income__add" v-if="!showForm" @click="showForm =  true">
          <app-icon name="add" size="extra-large" color="grey"/>
        </div>
        <ul class="setup-income__list" v-if="!showForm">
          <app-income v-for="income in this.$store.state.incomes" :key="income._id" :income="income"/>
        </ul>
        <app-btn normal primary @click.native="next" :disabled="this.$store.state.incomes === undefined || this.$store.state.incomes.length < 1">
          Next
        </app-btn>
        <budget-form
          :type="'income'"
          v-if="showForm"
          @closeForm="closeForm"
        />
    </div>
</template>

<script>
import BudgetForm from './BudgetForm'
import Income from '@/components/UI/Income'
export default {
  data () {
    return {
      showForm: false
    }
  },
  components: {
    'budget-form': BudgetForm,
    'app-income': Income
  },
  methods: {
    closeForm () {
      this.showForm = false
    },
    next () {
      this.$emit('startSetupExpense')
    }
  }
}
</script>

<style lang="scss" scoped>
.setup-income {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &__add {
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .5rem;
    border: 1px dashed $color-grey--main;
    cursor: pointer;
    margin-right: 3rem;
  }
  &__list {
    margin: 3rem 0;
  }
}
</style>
