<template>
    <div class="completed">
        <h1>Congratulations {{this.$store.state.auth.userName}}!</h1>
        <div class="completed__text">
          Your account is ready.
        </div>
        <div class="completed__cta">
            <app-btn normal primary @click.native="setAppStatus('active')">Get started</app-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'user',
      'dashboardData'
    ])
  },
  methods: {
    ...mapMutations([
      'setAppStatus'
    ])
  }

}
</script>

<style lang="scss" scoped>
.completed {
  position: absolute;
  width: 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: $color-white;
  border-radius: .5rem;
  padding: 2rem 0;
  & h1 {
        color: $color-primary;
  }
  &__text {
        margin: 2rem 0;
        font-size: $font-m;
        color: $color-grey--dark;
  }
}
</style>
