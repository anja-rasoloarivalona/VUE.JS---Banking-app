<template>
    <div class="auth">
        <form @submit="submitForm" class="form">
            <transition name="flip" mode="out-in">
                <component
                    :is="authMode"
                    :userInput="userInput"
                    :submit="submitForm"
                    :loading="loading"
                    :errors="errors">
                    <template #errors>
                        <div class="form__error" v-if="errors && errors.length > 0">
                            <div class="form__error__item" v-for="(error, index) in errors" :key="index">{{error.message}}</div>
                        </div>
                    </template>
                </component>
            </transition>
        </form>
    </div>
</template>

<script>
import { validator } from '@/utilities/input-validator.js'
import Login from './Login'
import Signup from './Signup'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      userInput: {
        name: '',
        email: '',
        password: ''
      },
      loading: false,
      errors: false
    }
  },
  computed: {
    ...mapGetters([
      'authMode'
    ])
  },
  methods: {
    submitForm () {
      const data = this.userInput
      let errors
      if (this.authMode === 'login') {
        delete data.name
        errors = validator(data)
        if (errors.length > 0) {
          this.errors = errors
        } else {
          this.login()
        }
      } else {
        errors = validator(data)
        if (errors.length > 0) {
          console.log(errors)
          this.errors = errors
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
        this.errors = result.errors
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
        this.errors = result.errors
      }
    }
  },
  components: {
    Login,
    Signup
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
    // background: red;
}
.form {
    // background: blue;
    height: 50rem;
    width: 60%;
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
