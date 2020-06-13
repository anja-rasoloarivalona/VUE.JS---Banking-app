<template>
        <label :for="id" class="frequency">
            <span>{{ id }}</span>
            <div class="input__container">
                <app-select-input
                    :options="counter"
                    v-model="value.counter"
                    i18
                />
                <app-select-input
                    :options="period"
                    v-model="value.period"
                    i18
                />
            </div>
        </label>
</template>

<script>
export default {
  props: {
    value: Object,
    id: String
  },
  data () {
    return {
      counter: [
        { value: 'once', i18: 'once' },
        { value: 'twice', i18: 'twice' },
        { value: 'three times', i18: 'threeTimes' },
        { value: 'four times', i18: 'fourTimes' },
        { value: 'five times', i18: 'fiveTimes' },
        { value: 'six times', i18: 'sixTimes' }
      ],
      period: [
        { value: 'a day', i18: 'perDay' },
        { value: 'a week', i18: 'perWeek' },
        { value: 'every two weeks', i18: 'everyTwoWeeks' },
        { value: 'a month', i18: 'perMonth' },
        { value: 'a year', i18: 'perYear' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
label {
    display: flex;
    flex-direction: column;
}
span {
    width: 10rem;
    margin-bottom: 0.5rem;
    font-size: $font-m;
    color: var(--textColor--dark)
}
.input__container {
    display: flex;
    justify-content: space-between;
    & label {
      width: 100%;
    }
    & label:first-child {
      margin-right: 1rem;
    }
}

</style>
