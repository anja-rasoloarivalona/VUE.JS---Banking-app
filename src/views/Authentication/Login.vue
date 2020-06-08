<template>
  <div>
    <div class="title">Login</div>
    <app-basic-input v-model="userInput.email" :id="'email'" :bgWhite="theme.isLight"/>
    <app-basic-input v-model="userInput.password" :id="'password'"  :bgWhite="theme.isLight"/>
    <div class="login__forgetPassword">
      <div @click="setResettingPasswordToTrue">Forget password</div>
    </div>
    <app-btn @click="submit">
        <span v-if="!loading">Login</span>
        <app-spinner v-else></app-spinner>
    </app-btn>
    <div class="login__signup">
        <div>Don't have an account?</div>
        <div @click="setAuthMode('signup')">Sign Up</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'theme'
    ])
  },
  props: {
    userInput: Object,
    loading: Boolean,
    submit: Function
  },
  methods: {
    ...mapMutations([
      'setAuthMode',
      'setResettingPasswordToTrue'
    ])
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 5rem;
  font-size: 4rem;
  color: $color-grey--dark;
}
button {
  background: var(--mainColor);
  height: 4.5rem !important;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0 !important;
  margin-top: 2rem !important;
    & span {
        color: $color-white;
        margin-bottom: 0;
    }
}

.login {
  &__forgetPassword{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: $font-s;
  color: var(--textColor--dark);
  cursor: pointer;
    & div {
      &:hover {
        text-decoration: underline;
        color: var(--mainColor);
      }
    }
  }
  &__signup {
    display: flex;
    justify-content: center;
    font-size: $font-m;
    margin-top: 3rem;
    & div:first-child {
      margin-right: .5rem;
      color: var(--textColor--dark)
    }
    & div:last-child {
      color: var(--mainColor);
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
