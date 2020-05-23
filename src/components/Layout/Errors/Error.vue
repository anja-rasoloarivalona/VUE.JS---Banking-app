<template>
    <transition :name="transitionName" mode="out-in" appear>
        <div class="error"  @click="removeError(index)">
            <div class="error__details">
                <span class="error__details__first">{{ errorFistWord }}</span>
                <span>{{ errorRemainingWords }}</span>
            </div>
            <div class="error__close" @click="removeError(index)">
                <app-icon name="close" color="warning" size="small"/>
            </div>
        </div>
      </transition>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      direction: 'right'
    }
  },
  methods: {
    ...mapMutations([
      'removeError'
    ])
  },
  computed: {
    transitionName () {
      return `slide-from-${this.direction}`
    },
    errorFistWord () {
      return this.error.split(' ')[0]
    },
    errorRemainingWords () {
      return ` ${this.error.substr(this.error.indexOf(' ') + 1)}`
    }
  },
  mounted () {
    this.direction = 'left'
    setTimeout(() => this.removeError(this.index), (this.index + 1) * 3000)
  },
  props: {
    error: String,
    index: Number
  }
}
</script>

<style lang="scss" scoped>
.error {
  font-size: $font-m;
  color: var(--warningColor);
  width: 25rem;
  padding: 2rem;
  background: $color-white;
  border: 1px solid var(--warningColor);
  margin-bottom: 1rem;
  border-radius: 1rem;
  position: relative;
  cursor: pointer;
  &__details__first {
    text-transform: capitalize;
  }
  &__close {
    position: absolute;
    right: .5rem;
    top: .5rem;
  }
}
</style>
