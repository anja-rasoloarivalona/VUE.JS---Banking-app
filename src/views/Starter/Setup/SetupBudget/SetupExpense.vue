<template>
    <div class="setup-expense">
        <div class="setup-expense__add" v-if="!showForm" @click="showForm =  true">
          <app-icon name="add" size="extra-large" color="grey"/>
        </div>
        <ul class="setup-expense__list" v-if="!showForm">
          <app-expense v-for="expense in this.$store.state.user.expenses" :key="expense._id" :expense="expense"/>
        </ul>
        <app-btn normal primary @click.native="next" :disabled="this.$store.state.user.expenses === undefined || this.$store.state.user.expenses.length < 1" v-if="!showForm">
          Next
        </app-btn>
        <budget-form
          :type="'expense'"
          v-if="showForm"
          @closeForm="closeForm"
        />
    </div>
</template>

<script>
import BudgetForm from '@/components/Forms/BudgetForm'
import Expense from '@/components/UI/Expense'
export default {
  data () {
    return {
      showForm: false
    }
  },
  components: {
    'budget-form': BudgetForm,
    'app-expense': Expense
  },
  methods: {
    closeForm () {
      this.showForm = false
    },
    next () {
      this.$emit('startSetupSavingsPlan')
    }
  }
}
</script>

<style lang="scss" scoped>
.setup-expense {
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
