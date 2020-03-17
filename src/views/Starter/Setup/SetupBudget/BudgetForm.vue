<template>
    <form class="budget-form">
            <app-input v-model="input.name" :id="'name'" bgWhite />
            <app-input v-model="input.amount" :id="'amount'" bgWhite />

            <app-input v-model="input.category" :id="'category'" bgWhite v-if="type === 'expense'"/>

            <app-input v-model="input.from" :id="'from'" bgWhite v-if="type === 'income'"/>
    </form>
</template>

<script>
export default {
  data () {
    return {
      input: {
        name: '',
        amount: 0,

        category: '',

        from: ''
      }
    }
  },
  props: {
    type: String
  }
}
</script>

<style lang="scss" scoped>
.budget-form {
    margin-top: 4rem;
    background: $color-grey--light;
    width: 50%;
    padding: 2rem;
}
</style>
