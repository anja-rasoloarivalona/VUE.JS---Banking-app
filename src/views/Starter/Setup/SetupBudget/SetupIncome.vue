<template>
    <div>
        <budget-form :type="'income'"/>
    </div>
</template>

<script>
import BudgetForm from './BudgetForm'
export default {
  components: {
    'budget-form': BudgetForm
  }
}
</script>

<style lang="scss" scoped>

</style>
