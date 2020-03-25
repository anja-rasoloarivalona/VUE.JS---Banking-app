<template>
        <component
            :is="successType"
        >
        </component>
</template>

<script>
import WelcomeLogin from './WelcomeLogin'
import WelcomeSignup from './WelcomeSignup'
export default {
  props: {
    action: String
  },
  computed: {
    successType () {
      return `welcome-${this.action}`
    }
  },
  components: {
    welcomeLogin: WelcomeLogin,
    welcomeSignup: WelcomeSignup
  }
}
</script>

<style lang="scss" scoped>

</style>
