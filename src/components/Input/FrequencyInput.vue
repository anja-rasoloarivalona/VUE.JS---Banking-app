<template>
    <div class="input">
        <label :for="id">
            <span>{{ id }}</span>
            <div class="input__container">
                <app-select-input
                    :options="counter"
                    :value="value.counter"
                    @selectInput="selectcounter"
                    bgWhite/>
                <app-select-input
                    :options="period"
                    :value="value.period"
                    @selectInput="selectPeriod"
                    bgWhite
                />
            </div>
        </label>
    </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'frequency'
  },
  props: {
    value: Object,
    id: String
  },
  data () {
    return {
      counter: ['once', 'twice', 'three times', 'four times', 'five times', 'six times'],
      period: ['a day', 'a week', 'every two weeks', 'a month', 'a year']
    }
  },
  methods: {
    selectcounter (value) {
      this.$emit('selectcounter', value)
    },
    selectPeriod (value) {
      this.$emit('selectPeriod', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
    & label {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }
    & span {
        width: 10rem;
        margin-bottom: 0.5rem;
        font-size: $font-m;
        color: $color-grey--dark;
    }
    &__container {
        display: flex;
        justify-content: space-between;
        & label {
            width: 49%;
        }
    }
}
</style>
