<template>
    <div class="input">
        <label :for="id">
            <span>{{ id }}</span>
            <input
              :id="id"
              @input="updateSelf($event.target.value)"
              :value="value"
              :class="{'bg-grey': currentTheme.includes('light') }"
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
    bgGrey: Boolean
  },
  computed: {
    ...mapGetters([
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
        width: 10rem;
        margin-bottom: 0.5rem;
        font-size: $font-m;
        color: var(--textColor--dark);
    }

    & input {
        height: 4rem;
        background: var(--surfaceColor);
        color: var(--textColor);
        border: none;
        padding-left: 1rem;
        border-radius: 0.5rem;
        &:focus {
        outline: none;
        }
        &.bg-grey {
          background: $color-grey--light;
        }
    }
}
</style>
