<template>
    <div class="auth">
        <div class="auth__img">
            <h1>Take control of your</h1>
            <h1>Personnal finance</h1>
        </div>
        <div class="auth__cta">
            <header class="auth__cta__header">
                <div v-if="authMode === 'login-form'" @click="authMode = 'signup-form'">Create account</div>
                <div v-else-if="authMode === 'signup-form'" @click="authMode = 'login-form'">Login</div>
                <div v-else>Logout</div>
            </header>
            <transition name="flip" mode="out-in">
                <component
                    :is="mode"
                    :authMode="authMode"
                >
                </component>
            </transition>
        </div>

    </div>
</template>

<script>
import AuthForm from './Form/Form'
import LoginSuccess from './Success/LoginSucces'
import SignupSuccess from './Success/SignupSuccess'
export default {
  data () {
    return {
      mode: 'auth-form',
      authMode: 'login-form'
    }
  },
  components: {
    authForm: AuthForm,
    signupSuccess: SignupSuccess,
    loginSuccess: LoginSuccess
  }
}
</script>

<style lang="scss">
.auth {
    width: 100%;
    height: 100%;
    display: flex;
    &__img {
        width: 55%;
        height: 100%;
        background-image: linear-gradient(to right,
            #027a66ea 10%,
            #027a66b4),
            url("../../../assets/landing.png");
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
    &__cta {
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
            & div {
                cursor: pointer;
            }
            & div:hover {
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
