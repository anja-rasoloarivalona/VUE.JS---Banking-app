<template>
    <div class="starter">
      <header class="starter__link">
                <div v-if="action === 'login' && !isAuth" @click="action = 'signup'">Create account</div>
                <div v-else-if="action === 'signup' && !isAuth" @click="action = 'login'">Login</div>
                <div v-else @click="logout">Logout</div>
      </header>
      <component
          :is="mode"
          :action="action"
          :submitSuccess="submitSuccess"
          :submitSucceeded="submitSucceeded">
      </component>
    </div>
</template>

<script>
import Auth from './Auth/Auth'
import Setup from './Setup/Setup'
import { EventBus } from '@/utilities/event-bus.js'

export default {
  data () {
    return {
      isAuth: false,
      mode: 'app-auth',
      action: 'login',
      submitSuccess: false
    }
  },
  created () {
    EventBus.$on('setupStarted', () => {
      this.mode = 'app-setup'
      this.action = 'login'
      this.submitSuccess = false
    })
    const userStatus = this.$store.state.status
    if (userStatus === 'created') {
      this.isAuth = true
      this.submitSuccess = true
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('bank-data')
      this.isAuth = false
      this.mode = 'app-auth'
      this.action = 'login'
      this.submitSuccess = false
    },
    submitSucceeded () {
      this.isAuth = true
      this.submitSuccess = true
    }
  },
  components: {
    appAuth: Auth,
    appSetup: Setup
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
            padding: 3rem;
            padding-right: 10rem;
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
