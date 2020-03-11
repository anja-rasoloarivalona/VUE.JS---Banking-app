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
             <form @submit="login">
               <div class="starter__login__title" v-text="actionValue"></div>
               <label v-if="action === 'Create'" for="name">
                    <span>name</span>
                    <input id="name" v-model="userInput.name"/>
                </label>
                <label for="email">
                    <span>email</span>
                    <input id="email" v-model="userInput.email"/>
                </label>
                <label for="password">
                    <span>password</span>
                    <input id="password" v-model="userInput.password"/>
                </label>
                <app-btn @click.prevent="login">
                    Submit
                </app-btn>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userInput: {
        name: '',
        email: '',
        password: ''
      },
      submitted: false,
      action: 'Login'
    }
  },
  methods: {
    login () {
    }
  },
  computed: {
    actionValue () {
      let action
      if (this.action === 'Login') {
        action = 'Login'
      } else {
        action = 'Create account'
      }
      return action
    }
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
        &__title {
            margin-bottom: 5rem;
            font-size: 4rem;
            color: $color-grey--dark;
        }
        & form {
            display: flex;
            flex-direction: column;
            width: 50%;
            & label {
                display: flex;
                flex-direction: column;
                margin-bottom: 2rem;
            }
            & span {
                width: 10rem;
                margin-bottom: .5rem;
                font-size: $font-m;
                color: $color-grey--dark;
            }

            & input {
                height: 4rem;
                background: $color-grey--light;
                border:none;
                padding-left: 1rem;
                border-radius: .5rem;
                &:focus {
                    outline: none;
                }
            }
            & button {
                background: $color-primary;
                padding: 1rem 0;
                border: none;
                border-radius: .5rem;
                color: $color-white
            }
        }
    }
}
</style>
