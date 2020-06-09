<template>
    <div class="setup__budget">
        <incomes />
        <expenses />
        <goal />
    </div>
</template>

<script>
import Expenses from './Expenses'
import Incomes from './Incomes'
import Goal from './Goal'

export default {
  components: {
    Expenses,
    Incomes,
    Goal
  }
}
</script>

<style lang="scss" scoped>
.setup__budget {

}
</style>
