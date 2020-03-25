<template>
    <form @submit="submitForm" class="form" v-if="authMode !== ''">
        <transition name="flip" mode="out-in">
            <component
                :is="activeForm"
                :userInput="userInput"
                :submit="submitForm"
                :loading="loading"
                :error="error">
            <template #error>
                <div class="form__error" v-if="error && error.length > 0">
                    <div class="form__error__item" v-for="(err, index) in error" :key="index">{{err}}</div>
                </div>
            </template>
            </component>
        </transition>
    </form>
</template>

<script>
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { validator } from '@/utilities/input-validator.js'
export default {
  data () {
    return {
      userInput: {
        name: '',
        email: '',
        password: ''
      },
      loading: false,
      error: false
    }
  },
  props: {
    authMode: String
  },
  computed: {
    activeForm () {
      return `${this.authMode}-form`
    }
  },
  methods: {
    submitForm () {
      const data = this.userInput
      let error
      if (this.authMode === 'login') {
        delete data.name
        error = validator(data)
        if (error.length > 0) {
          this.error = error
        } else {
          this.login()
        }
      } else {
        error = validator(data)
        if (error.length > 0) {
          console.log(error)
          this.error = error
        } else {
          this.signup()
        }
      }
    },
    login: async function () {
      this.loading = true
      this.error = false
      const graphqlQuery = {
        query: `{
              login(email: "${this.userInput.email}", password: "${this.userInput.password}") {
                  token
                  user {
                      _id
                      name
                      status
                      wallets {
                        _id
                        walletType
                        amount
                        supplier
                        shortId
                        color
                      }
                      expenses {
                        _id
                        name
                        amount
                        category
                        expenseType
                        lastPayout
                        nextPayout
                        used
                        frequency {
                          counter
                          period
                        }
                      }
                      incomes {
                        _id
                        name
                        amount
                        from
                        frequency {
                            counter
                            period
                        }
                        lastPayout
                        nextPayout
                        autoWriting
                        notification
                      }
                  }
              }
          }`
      }
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.login
        const remainingMilliseconds = 24 * 60 * 60 * 1000
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds).toISOString()
        const data = {
          token: responseData.token,
          userId: responseData.user._id,
          userName: responseData.user.name,
          userStatus: responseData.user.status,
          appStatus: responseData.user.status === 'created' ? 'welcome' : 'running',
          expiryDate: expiryDate
        }
        this.$store.commit('setIsAuthToTrue', data)
        this.loading = false
      } catch (err) {
        this.loading = false
        const errorData = err.body.errors
        this.error = [errorData[0].message]
      }
    },
    signup: async function () {
      this.loading = true
      this.error = false
      const graphqlQuery = {
        query: `mutation {
                    createUser(userInput: {
                        email: "${this.userInput.email}",
                        name: "${this.userInput.name}",
                        password: "${this.userInput.password}"
                    }) {
                        token
                        user {
                            _id
                            name
                            status
                        }
                    }
                }`
      }
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        const responseData = resData.data.createUser
        const remainingMilliseconds = 24 * 60 * 60 * 1000
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds).toISOString()
        const data = {
          token: responseData.token,
          userId: responseData.user._id,
          userName: responseData.user.name,
          userStatus: responseData.user.status,
          appStatus: 'welcome',
          expiryDate: expiryDate
        }
        this.$store.commit('setIsAuthToTrue', data)
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    }
  },
  components: {
    loginForm: LoginForm,
    signupForm: SignupForm
  }
}
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  width: 50%;
  &__title {
    margin-bottom: 5rem;
    font-size: 4rem;
    color: $color-grey--dark;
  }
  & button {
        background: $color-primary;
        height: 4.5rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        & span {
        color: $color-white;
        margin-bottom: 0;
        }
  }
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
