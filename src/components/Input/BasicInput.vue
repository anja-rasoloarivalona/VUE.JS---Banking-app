<template>
    <div class="input">
        <label :for="id">
            <span>{{ id }}</span>
            <input
              v-bind="$attrs"
              :id="id"
              @input="updateSelf($event.target.value)"
              :value="value"
              :class="{'bg-default': theme.isLight, 'bg-on-surfaceColor': theme.isDark, 'bg-white': bgWhite}"
            />
        </label>
    </div>
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
    bgWhite: Boolean
  },
  computed: {
    ...mapGetters([
      'theme',
      'currentTheme'
    ])
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
    & label {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }
    & span {
        // width: 10rem;
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
        &:focus {
        outline: none;
        }
    }
}
</style>
