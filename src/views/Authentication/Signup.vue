<template>
  <div>
      <div class="title">Signup</div>
      <slot name="errors"></slot>
      <app-basic-input v-model="userInput.name" :id="'name'" />
      <app-basic-input v-model="userInput.email" :id="'email'" />
      <app-basic-input v-model="userInput.password" :id="'password'" />
      <app-btn @click="submit">
          <span v-if="!loading">Sign up</span>
          <app-spinner v-else></app-spinner>
      </app-btn>
  </div>
</template>

<script>
export default {
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
</style>
