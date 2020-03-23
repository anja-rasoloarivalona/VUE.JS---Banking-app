<template>
    <div class="input">
        <label :for="id">
            <span>{{ id }}</span>
            <input
              :id="id"
              @input="updateSelf($event.target.value)"
              :value="value"
              :class="{'bg-grey': bgGrey }"
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
    bgGrey: Boolean
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
        background: $color-white;
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
