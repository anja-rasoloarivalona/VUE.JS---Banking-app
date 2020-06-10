<template>
        <label :for="id" class="label">
            <span>{{ id }}</span>
            <date-picker :id="id" :value="value" @input="updateSelf" />
        </label>
</template>

<script>
import { mapGetters } from 'vuex'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  components: {
    'date-picker': DatePicker
  },
  computed: {
    ...mapGetters([
      'theme'
    ])
  },
  props: {
    id: String,
    value: [String, Date]
  },
  methods: {
    updateSelf (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
label {
  display: flex;
  flex-direction: column;
}
span {
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

.vc-border {
    border-width: 0px !important;
}

input.vc-bg-white  {
  background:  var(--calendarBackground) !important;
}

.vc-bg-white  {
    background: var(--calendarBackground) !important;
}

.vc-text-base {
    font-size: 13px !important;
    font-family: "Open Sans", sans-serif !important;
    color: var(--textColor) !important;
}
</style>
