<template>
    <div class="setup-income">
        <div class="setup-income__add" v-if="!showForm" @click="showForm =  true">
          <app-icon name="add" size="extra-large" color="grey"/>
        </div>
        <budget-form
          :type="'income'"
          v-if="showForm"
          @closeForm="closeForm"
        />
    </div>
</template>

<script>
import BudgetForm from './BudgetForm'
export default {
  data () {
    return {
      showForm: false
    }
  },
  components: {
    'budget-form': BudgetForm
  },
  methods: {
    closeForm () {
      this.showForm = false
    }
  }
}
</script>

<style lang="scss" scoped>
.setup-income {
  margin-top: 3rem;
  &__add {
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .5rem;
    border: 1px dashed $color-grey--main;
    cursor: pointer;
  }
}
</style>
