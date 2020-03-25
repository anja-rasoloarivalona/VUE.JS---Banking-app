<template>
    <div class="starter">
      <header class="starter__link">
                <div v-if="action === 'login' && mode === 'app-auth'" @click="action = 'signup'">Create account</div>
                <div v-else-if="action === 'signup' && mode === 'app-auth'" @click="action = 'login'">Login</div>
                <div v-else @click="logout">Logout</div>
      </header>
      <transition name="flip" mode="out-in">
        <component
          :is="mode"
          :action="action"
        >
        </component>
      </transition>
    </div>
</template>

<script>
import Auth from './Auth/Auth'
import Welcome from './Welcome/Welcome'
import Setup from './Setup/Setup'

export default {
  data () {
    return {
      action: 'login'
    }
  },
  computed: {
    mode () {
      if (this.$store.state.auth.appStatus === 'authentication') {
        return 'app-auth'
      }
      if (this.$store.state.auth.appStatus === 'welcome') {
        return 'app-welcome'
      }
      return 'app-setup'
    }
  },
  methods: {
    logout () {
      this.$store.commit('setIsAuthToFalse')
    }
  },
  components: {
    appAuth: Auth,
    appSetup: Setup,
    appWelcome: Welcome
  }
}
</script>

<style lang="scss" scoped>
.starter {
    grid-row: 1 / -1;
    grid-column: 1 / -1;
    width: 100vw;
    height: 100vh;
    &__link {
            position: absolute;
            top: 0;
            right: 0;
            height: 7rem;
            width: 14rem;
            display: flex;
            align-items: center;
            text-align: end;
            font-size: $font-m;
            color: $color-primary;
            z-index: 1;
            & div {
                cursor: pointer;
            }
            & div:hover {
                text-decoration: underline;
            }
        }
}
</style>
