<template>
    <form class="budget-form">
            <app-input v-model="input.name" :id="'name'" bgWhite/>
            <app-select-input :id="'flow'"  :options="flowTypes" @selectInput="input.flow = $event" bgWhite/>

            <app-input v-model="input.category" :id="'category'" bgWhite v-if="input.flow === 'expense'"/>

            <app-input v-model="input.from" :id="'from'" bgWhite v-if="input.flow === 'income'"/>
    </form>
</template>

<script>
export default {
  data () {
    return {
      input: {
        name: '',
        flow: 'income',
        amount: 0,

        category: '',

        from: ''
      },
      flowTypes: ['income', 'expense']
    }
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
