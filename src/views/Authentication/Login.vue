<template>
  <div>
    <div class="title">Login</div>
    <slot name="errors"></slot>
    <app-basic-input v-model="userInput.email" :id="'email'" bg-grey/>
    <app-basic-input v-model="userInput.password" :id="'password'" bg-grey/>
    <app-btn @click="submit">
        <span v-if="!loading">Login</span>
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
  background: var(--mainColor);
  height: 4.5rem;
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
</style>
