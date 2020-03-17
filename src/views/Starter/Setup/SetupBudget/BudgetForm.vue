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
            <div class="input-date">
                <label for="lastPayout">
                    <span>last payout</span>
                    <app-date-picker v-model='input.lastPayout' id="lastPayout"/>
                </label>
            </div>
            <app-select-input :id="'auto writing'"  :options="['yes', 'no']" @selectInput="input.autoWriting = $event" bgWhite />
            <app-select-input :id="'notification'"  :options="['yes', 'no']" @selectInput="input.notification = $event" bgWhite />
            <app-btn normal primary @click.native="submit" >
                <span>Add</span>
            </app-btn>
            <div class="budget-form__close" @click="$emit('closeForm')">
                  <app-icon name="close" size="large" color="primary"/>
            </div>
    </form>
</template>

<script>
export default {
  data () {
    return {
      attrs: [
        {
          key: 'today',
          highlight: true,
          dates: new Date()
        }
      ],
      date: new Date(),
      input: {
        name: '',
        amount: 0,

        category: '',

        from: '',
        frequency: {
          counter: 'once',
          period: 'a day'
        },
        lastPayout: new Date(),
        autoWriting: 'yes',
        notification: 'yes'
      }
    }
  },
  props: {
    type: String
  },
  methods: {
    submit () {
      console.log('submit', this.input)
    }
  }
}
</script>

<style lang="scss">
.budget-form {
    margin-top: 4rem;
    background: $color-grey--light;
    width: 100%;
    padding: 2rem;
    padding-top: 4rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: max-content;
    grid-auto-rows: max-content;
    column-gap: 2rem;
    position: relative;
    padding-bottom: 5rem;
    & button {
        position: absolute;
        bottom: 1rem;
        left: 2rem;
    }
    &__close {
        position: absolute;
        right: 1rem;
        top: 1rem;
    }
}
.input-date {
  display: flex;
  flex-direction: column;
  width: 100%;
    & label {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }
    & span {
        width: 100%;
        margin-bottom: 0.5rem;
        font-size: 13px;
        &:first-child {
            color: $color-grey--dark;
        }
        & input {
            height: 4rem;
        }
    }
}
.vc-border {
    border-width: 0px !important;
}

.vc-text-base {
    font-size: 13px !important;
    font-family: "Open Sans", sans-serif !important;
    color: #000000;
}

</style>
