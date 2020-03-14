<template>
    <div class="loginSuccess">
        <div class="loginSuccess__title">Welcome back {{this.$store.state.userName}}!</div>
        <div class="loginSuccess__para">
            Let's setup your account and give you the control of your pesonnal finance.
        </div>
        <app-btn @click.native="startSetup" normal primary>
            Setup
        </app-btn>
    </div>
</template>

<script>
import { EventBus } from '@/utilities/event-bus.js'
export default {
  methods: {
    startSetup () {
      console.log('clicked')
      EventBus.$emit('setupStarted')
    }
  }
}
</script>

<style lang="scss" scoped>
.loginSuccess {
    display: flex;
    flex-direction: column;
    &__title {
        font-size: 3rem;
        font-weight: bold;
        color: $color-grey--main
    }
    &__para {
        margin: 2rem 0;
        font-size: $font-m;
        color: $color-grey--dark
    }
}
</style>
