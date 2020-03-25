<template>
    <div class="welcome-login">
        <div class="welcome-login__title">Welcome back {{this.$store.state.auth.userName}}!</div>
        <div class="welcome-login__para">
            Let's setup your account and give you the control of your pesonnal finance.
        </div>
        <app-btn @click.native="startSetup" normal primary>
            Setup
        </app-btn>
    </div>
</template>

<script>
export default {
  methods: {
    startSetup () {
      this.$store.commit('setAppStatus', 'setting-up')
    }
  }
}
</script>

<style lang="scss" scoped>
.welcome-login {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
