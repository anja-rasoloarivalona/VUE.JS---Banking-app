<template>
<span>
    <div class="form__title">Signup</div>
    <app-input v-model="userInput.name" :id="'name'"/>
    <app-input v-model="userInput.email" :id="'email'"/>
    <app-input v-model="userInput.password" :id="'password'"/>
    <app-btn :click="submit">
        <span v-if="!loading">Submit</span>
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

<style lang="scss" scoped>
</style>
