<template>
  <span>
    <div class="form__title">Login</div>
    <slot name="error"></slot>
    <app-basic-input v-model="userInput.email" :id="'email'" bg-grey/>
    <app-basic-input v-model="userInput.password" :id="'password'" bg-grey/>
    <app-btn @click="submit">
        <span v-if="!loading">Login</span>
        <app-spinner v-else></app-spinner>
    </app-btn>
  </span>
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
