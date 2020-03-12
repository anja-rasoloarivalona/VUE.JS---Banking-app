<template>
    <form @submit="submitForm" class="form" v-if="authMode !== ''">
        <transition name="flip" mode="out-in">
            <component
                :is="activeForm"
                :userInput="userInput"
                :submit="submitForm"
                :loading="loading"
            >
            </component>
        </transition>
    </form>
</template>

<script>
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
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
  props: {
    authMode: String,
    submitSucceeded: Function
  },
  computed: {
    activeForm () {
      return `${this.authMode}-form`
    }
  },
  methods: {
    submitForm () {
      if (this.authMode === 'login') {
        this.login()
      } else {
        this.signup()
      }
    },
    login: async function () {
      this.loading = true
      const graphqlQuery = {
        query: `{
              login(email: "${this.userInput.email}", password: "${this.userInput.password}") {
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
        const responseData = resData.data.login
        const data = {
          token: responseData.token,
          userId: responseData.user._id,
          userName: responseData.user.name,
          status: responseData.user.status
        }
        this.$store.commit('authUser', data)
        const remainingMilliseconds = 24 * 60 * 60 * 1000
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds).toISOString()
        const localData = { ...data, expiryDate }
        localStorage.setItem('bank-data', JSON.stringify(localData))
        this.loading = false
        this.submitSucceeded()
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    signup: async function () {
      this.loading = true
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
        const data = {
          token: responseData.token,
          userId: responseData.user._id,
          userName: responseData.user.name,
          status: responseData.user.status
        }
        this.$store.commit('authUser', data)
        const remainingMilliseconds = 24 * 60 * 60 * 1000
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds).toISOString()
        const localData = { ...data, expiryDate }
        localStorage.setItem('bank-data', JSON.stringify(localData))
        this.loading = false
        this.submitSucceeded()
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
  &__group {
    & label {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }
    & span {
        width: 10rem;
        margin-bottom: 0.5rem;
        font-size: $font-m;
        color: $color-grey--dark;
    }

    & input {
        height: 4rem;
        background: #e6e6e6;
        border: none;
        padding-left: 1rem;
        border-radius: 0.5rem;
        &:focus {
        outline: none;
        }
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
  }
}
</style>
