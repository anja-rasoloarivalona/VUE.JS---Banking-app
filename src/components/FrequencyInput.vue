<template>
    <div class="input">
        <label :for="id">
            <span>{{ id }}</span>
            <div class="input__container">
                <app-select-input :id="'frequency'" :options="frequency" @selectInput="selectFrequency" bgWhite/>
                <app-select-input :id="'period'" :options="period" @selectInput="selectPeriod" bgWhite/>
            </div>
        </label>
    </div>
</template>

<script>
export default {
  data () {
    return {
      frequency: ['once', 'twice', 'three times', 'four times', 'five times', 'six times'],
      period: ['a day', 'a week', 'a month', 'a year']
    }
  },
  methods: {
    selectFrequency (value) {
      this.$emit('selectFrequency', value)
    },
    selectPeriod (value) {
      this.$emit('selectPeriod', value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
