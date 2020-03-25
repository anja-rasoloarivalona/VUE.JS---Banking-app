<template>
    <div class="welcome-signup">
        <div class="welcome-signup__title">Welcome {{this.$store.state.auth.userName}}!</div>
        <div class="welcome-signup__board">
            <h2>Congratulations! Your account has been created successfully</h2>
        </div>
        <app-btn normal primary @click.native="startSetup">
            Get started
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
.welcome-signup {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
