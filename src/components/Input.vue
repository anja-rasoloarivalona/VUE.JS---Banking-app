<template>
    <div class="input">
        <label :for="id">
            <span>{{ id }}</span>
            <input
              @input="updateSelf($event.target.value)"
              :value="value"
              :class="{'bgWhite': bgWhite }"
            />
        </label>
    </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number],
    id: String,
    bgWhite: Boolean,
    amount: Boolean
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
        color: $color-grey--dark;
    }

    & input {
        height: 4rem;
        background: $color-grey--light;
        border: none;
        padding-left: 1rem;
        border-radius: 0.5rem;
        &:focus {
        outline: none;
        }
        &.bgWhite {
          background: $color-white;
        }
    }
}
</style>
