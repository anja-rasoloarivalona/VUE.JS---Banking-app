<template>
        <label :for="id" class="input" :class="{disabled: isDisabled}">
            <span v-if="id">{{ id }}</span>
            <div class="input__container">
              <input
                v-bind="$attrs"
                :id="id"
                :placeholder="placeholder"
                :disabled="isDisabled"
                @input="updateSelf($event.target.value)"
                :value="value"
                :class="{'bg-default': theme.isLight, 'bg-on-surfaceColor': theme.isDark, 'bg-white': bgWhite}"
              />
              <div class="input__currency" v-if="type === 'number'">
                {{ currency }}
              </div>
            </div>
        </label>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number],
    id: String,
    bgWhite: Boolean,
    isDisabled: Boolean,
    placeholder: String,
    type: String
  },
  computed: {
    ...mapGetters([
      'theme',
      'currentTheme',
      'currentCurrency'
    ]),
    currency () {
      return this.currentCurrency.split('-')[0].trim()
    }
  },
  methods: {
    updateSelf (name) {
      this.$emit('input', name)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__container {
    position: relative;
  }
    &.disabled {
      cursor: not-allowed;
      & input {
          color: var(--textColor--dark);
          cursor: not-allowed;
      }
    }
    & label {
        display: flex;
        flex-direction: column;
    }
    & span {
        margin-bottom: 0.5rem;
        font-size: $font-m;
        color: var(--textColor--dark);
    }

    & input {
        height: 4rem;
        color: var(--textColor);
        border: none;
        padding-left: 1rem;
        border-radius: 0.5rem;
        width: 100%;
        &:focus {
        outline: none;
        }
    }
    &__currency {
      position: absolute;
      right: 2rem;
      top: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      align-items: center;
      font-size: $font-s;
      color: var(--textColor--dark);
      // background: red;
    }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
