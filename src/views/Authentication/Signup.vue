<template>
  <div>
      <div class="title">Signup</div>
      <app-basic-input v-model="userInput.name" id="name" :bgWhite="theme.isLight"/>
      <app-basic-input v-model="userInput.email" id="email" :bgWhite="theme.isLight"/>
      <app-basic-input v-model="userInput.password" id="password" :bgWhite="theme.isLight"/>
      <app-btn @click="submit">
          <span v-if="!loading">Sign up</span>
          <app-spinner v-else></app-spinner>
      </app-btn>
      <div class="signup__login">
        <div>Already have an account?</div>
        <div @click="setAuthMode('login')">Login</div>
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
  methods: {
    ...mapMutations([
      'setAuthMode'
    ])
  },
  props: {
    userInput: Object,
    loading: Boolean,
    submit: Function
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
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  margin: 0 !important;
  margin-top: 2rem !important;
  cursor: pointer;
  & span {
  color: $color-white;
  margin-bottom: 0;
  }
}

.signup__login {
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
</style>
