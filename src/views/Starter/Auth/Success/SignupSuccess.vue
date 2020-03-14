<template>
    <div class="signupSuccess">
        <div class="signupSuccess__title">Welcome {{this.$store.state.userName}}!</div>
        <div class="signupSuccess__board">
            <h2>Congratulations! Your account has been created successfully</h2>
        </div>
        <app-btn normal primary @click="startSetup">
            Get started
        </app-btn>
    </div>
</template>

<script>
import { EventBus } from '@/utilities/event-bus.js'
export default {
  methods: {
    startSetup () {
      EventBus.$emit('setupStarted')
    }
  }
}
</script>

<style lang="scss" scoped>
.signupSuccess {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__title {
        font-size: 2rem;
        color: $color-grey--dark;
    }
    &__board {
        border: 1px solid $color-primary;
        background: $color-white;
        padding: 2rem;
        color: $color-primary;
        margin: 3rem 0;
        border-radius: .5rem;
    }
}
</style>
