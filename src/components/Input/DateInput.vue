<template>
        <label :for="id" class="label">
            <span class="label__id">{{ id }}</span>
            <date-picker :id="id" :value="value" @input="updateSelf" :locale="currentLanguage"/>
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
      'theme',
      'currentLanguage'
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
.label {
  display: flex;
  flex-direction: column;
  &__id {
    width: 100%;
    margin-bottom: 0.5rem;
    font-size: 13px;
    color: $color-grey--dark;
      & input {
        height: 4rem;
      }
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
