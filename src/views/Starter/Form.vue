<template>
  <form @submit="login" class="form">
    <div class="form__title" v-text="actionValue"></div>
    <label v-if="action === 'Create'" for="name">
      <span>name</span>
      <input id="name" v-model="userInput.name" />
    </label>
    <label for="email">
      <span>email</span>
      <input id="email" v-model="userInput.email" />
    </label>
    <label for="password">
      <span>password</span>
      <input id="password" v-model="userInput.password" />
    </label>
    <app-btn @click.prevent="login">
      <span v-if="!loading">Submit</span>
      <app-spinner v-else></app-spinner>
    </app-btn>
  </form>
</template>

<script>
export default {
  props: {
    action: String,
    userInput: Object,
    loading: Boolean,
    login: Function
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
.form {
  display: flex;
  flex-direction: column;
  width: 50%;
  &__title {
    margin-bottom: 5rem;
    font-size: 4rem;
    color: $color-grey--dark;
  }
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
    background: $color-grey--light;
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
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 0.5rem;
    & span {
      color: $color-white;
      margin-bottom: 0;
    }
  }
}
</style>
