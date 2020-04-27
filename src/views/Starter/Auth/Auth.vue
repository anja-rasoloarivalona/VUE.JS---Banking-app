<template>
    <div class="auth">
        <div class="auth__img">
            <h1>Take control of your</h1>
            <h1>Personnal finance</h1>
        </div>
        <div class="auth__cta">
            <auth-form :authMode="action"></auth-form>
        </div>

    </div>
</template>

<script>
import theme from '@/assets/theme'
import { mapGetters } from 'vuex'
import AuthForm from './Form/Form'
export default {
  props: {
    action: String
  },
  computed: {
    ...mapGetters([
      'currentTheme'
    ]),
    backgroundColor () {
      return theme[this.currentTheme]['--mainColor']
    }
  },
  mounted () {
    // console.log(theme[this.currentTheme])
  },
  components: {
    authForm: AuthForm
  }
}
</script>

<style lang="scss" scoped>
// .auth {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     &__img {
//         width: 55%;
//         height: 100%;
//         background-image: linear-gradient(to right,
//             #027a66ea 10%,
//             #027a66b4 ),
//             url("../../../assets/landing.png");
//         background-repeat: no-repeat;
//         background-size: cover;
//         display: flex;
//         justify-content: center;
//         flex-direction: column;
//         padding-left: 5rem;
//         color: $color-white;
//         & h1 {
//           font-size: 4rem;
//           line-height: 1.4;
//         }
//     }
//     &__cta {
//         width: 45%;
//         height: 100%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         position: relative;
//     }
// }

</style>
