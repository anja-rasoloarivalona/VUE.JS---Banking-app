<template>
    <div class="auth" :class="{'reset-password': auth.isResettingPassword}">
        <form @submit="submitForm" class="form" v-if="!auth.isResettingPassword">
            <transition name="flip" mode="out-in">
                <component
                    :is="authMode"
                    :userInput="userInput"
                    :submit="submitForm"
                    :loading="loading"
                >
                </component>
            </transition>
        </form>
          <reset v-else/>
    </div>
</template>

<script>
import { validator } from '@/utilities/input-validator.js'
import Login from './Login'
import Signup from './Signup'
import Reset from './ResetPassword/ResetPassword'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      userInput: {
        name: '',
        email: '',
        password: ''
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'authMode',
      'auth'
    ])
  },
  methods: {
    ...mapMutations([
      'addError'
    ]),
    submitForm () {
      const data = this.userInput
      let errors
      if (this.authMode === 'login') {
        delete data.name
        errors = validator(data)
        if (errors.length > 0) {
          errors.forEach((err, index) => {
            setTimeout(() => this.addError(err), (index + 1) * 500)
          })
        } else {
          this.login()
        }
      } else {
        errors = validator(data)
        if (errors.length > 0) {
          errors.forEach((err, index) => {
            setTimeout(() => this.addError(err), (index + 1) * 500)
          })
        } else {
          this.signup()
        }
      }
    },
    login: async function () {
      this.loading = true
      this.errors = false
      const result = await this.$store.dispatch('login', this.userInput)
      if (result.success) {
        this.loading = false
      } else {
        this.loading = false
        result.errors.forEach((err, index) => {
          setTimeout(() => this.addError(err.message), (index + 1) * 500)
        })
      }
    },
    signup: async function () {
      this.loading = true
      this.errors = false
      const result = await this.$store.dispatch('signup', this.userInput)
      if (result.success) {
        this.loading = false
      } else {
        this.loading = false
        result.errors.forEach((err, index) => {
          setTimeout(() => this.addError(err.message), (index + 1) * 500)
        })
      }
    }
  },
  components: {
    Login,
    Signup,
    Reset
  }
}
</script>

<style lang="scss" scoped>
.auth {
    position: fixed;
    width: 45vw;
    height: 100vh;
    right: 0;
    top: 0;
    background: var(--backgroundColor);
    transition: all .5s ease-in;
    // background: red;
    &.reset-password {
      width: 100vw
    }
}
.form {
    // background: blue;
    height: 50rem;
    width: 43rem;
    position: absolute;
    top: 29vh;
    left: 0;
    right: 0;
    margin: auto;
    &__error {
        margin: 2rem 0;
        &__item {
        border: 1px solid $color-red;
        padding: 1rem;
        color: $color-red;
        font-weight: bold;
        font-size: $font-m;
        border-radius: .5rem;
        margin: .5rem 0;
        }
    }
}
</style>
