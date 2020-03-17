<template>
    <form class="budget-form">
            <app-input v-model="input.name" :id="'name'" bgWhite />
            <app-input v-model="input.amount" :id="'amount'" bgWhite />

            <app-input v-model="input.category" :id="'category'" bgWhite v-if="type === 'expense'"/>
            <app-input v-model="input.from" :id="'from'" bgWhite v-if="type === 'income'"/>

            <app-frequency-input
                :id="'frequency'"
                v-model="input.frequency"
                @selectcounter="input.frequency.counter = $event"
                @selectPeriod="input.frequency.period = $event"
            />
            <app-btn normal primary @click.native="submit" >
                <span>Add</span>
            </app-btn>
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

        from: '',
        frequency: {
          counter: 'once',
          period: 'a day'
        }
      }
    }
  },
  props: {
    type: String
  },
  methods: {
    submit () {
      console.log('submit', this.input.frequency)
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
