<template>
        <label :for="id" class="frequency">
            <span>{{ id }}</span>
            <div class="input__container">
                <app-select-input
                    :options="counter"
                    v-model="value.counter"
                />
                <app-select-input
                    :options="period"
                    v-model="value.period"
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
      counter: ['once', 'twice', 'three times', 'four times', 'five times', 'six times'],
      period: ['a day', 'a week', 'every two weeks', 'a month', 'a year']
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
    & label:first-child {
      margin-right: 1rem;
    }
}

</style>
