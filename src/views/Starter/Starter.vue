<template>
    <div class="starter">
        <div class="starter__img">
            <h1>Take control</h1>
            <h1>Of your personnal finance</h1>
        </div>
        <div class="starter__login">
            <div class="starter__login__header">
                <div class="starter__login__header__cta">
                    <span v-if="action === 'Login'" @click="action = 'Create'">Create account</span>
                    <span v-else @click="action = 'Login'">Login</span>
                </div>
            </div>
            <transition name="flip" mode="out-in">
                <component
                    :is="mode"
                    :action="action"
                    :userInput="userInput"
                    :loading="loading"
                    :login="login">
                </component>
            </transition>
        </div>
    </div>
</template>

<script>
import Form from './Form'
import CreateAccountSuccess from './CreateAccountSuccess'
import Setup from './Setup'
export default {
  data () {
    return {
      loading: false,
      userInput: {
        name: '',
        email: '',
        password: ''
      },
      submitted: false,
      action: 'Login',
      mode: 'starter-form'
    }
  },
  methods: {
    login: async function () {
      this.loading = true
      const graphqlQuery = {
        query: `mutation {
                    createUser(userInput: {
                        email: "${this.userInput.email}",
                        name: "${this.userInput.name}",
                        password: "${this.userInput.password}"
                    }) {
                        email
                        name
                    }
                }`
      }
      try {
        const response = await this.$http.post('', graphqlQuery)
        const resData = await response.json()
        this.$store.state.user = resData.data.createUser
        this.loading = false
        this.mode = 'create-success'
        console.log(resData)
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    }
  },
  components: {
    starterForm: Form,
    createSuccess: CreateAccountSuccess,
    startedSetup: Setup
  }
}
</script>

<style lang="scss" scoped>
.starter {
    grid-row: 1 / -1;
    grid-column: 1 / -1;
    width: 100vw;
    height: 100vh;
    background: $color-white;
    display: flex;
    align-items: center;
    justify-content: center;
    &__img {
        width: 55%;
        height: 100%;
        background-image: linear-gradient(to right,
            #027a66ea 10%,
            #027a66b4),
            url("../../assets/landing.png");
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-left: 5rem;
        color: $color-white;
        & h1 {
          font-size: 4rem;
          line-height: 1.4;
        }
    }
    &__login {
        width: 45%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        &__header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 3rem;
            padding-right: 10rem;
            text-align: end;
            font-size: $font-m;
            color: $color-primary;
            & span {
                cursor: pointer;
            }
            & span:hover {
                text-decoration: underline;
            }
        }
    }
}
.flip-enter-active {
    animation: flip-in .5s ease-out forwards;
}
.flip-leave-active {
    animation: flip-out .5s ease-out forwards;
}
@keyframes flip-out {
    from {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(90deg);
    }
}
@keyframes flip-in {
    from {
        transform: rotateY(90deg);
    }
    to {
        transform: rotateY(0deg);
    }
}
</style>
