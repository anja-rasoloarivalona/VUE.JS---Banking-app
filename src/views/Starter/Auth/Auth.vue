<template>
    <div class="auth">
        <div class="auth__img">
            <h1>Take control of your</h1>
            <h1>Personnal finance</h1>
        </div>
        <div class="auth__cta">
            <transition name="flip" mode="out-in">
                <component
                    :is="authState"
                    :authMode="action"
                    :submitSucceeded="submitSucceeded"
                >
                </component>
            </transition>
        </div>

    </div>
</template>

<script>
import AuthForm from './Form/Form'
import SuccessForm from './Success/Success'

export default {
  props: {
    action: String,
    submitSuccess: Boolean,
    submitSucceeded: Function
  },
  computed: {
    authState () {
      if (this.submitSuccess) {
        return 'success-form'
      } else {
        return 'auth-form'
      }
    }
  },
  components: {
    authForm: AuthForm,
    successForm: SuccessForm
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
