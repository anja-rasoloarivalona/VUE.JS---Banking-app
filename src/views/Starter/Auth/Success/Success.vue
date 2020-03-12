<template>
        <component
            :is="successType"
        >
        </component>
</template>

<script>
import LoginSuccess from './LoginSucces'
import SignupSuccess from './SignupSuccess'
export default {
  props: {
    authMode: String
  },
  computed: {
    successType () {
      return `${this.authMode}-success`
    }
  },
  components: {
    loginSuccess: LoginSuccess,
    signupSuccess: SignupSuccess
  }
}
</script>

<style lang="scss" scoped>

</style>
