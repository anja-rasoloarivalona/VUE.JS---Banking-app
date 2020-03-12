<template>
<span>
    <div class="form__title">Signup</div>
    <div class="form__group">
        <label for="name">
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
        <app-btn @click.prevent="submit">
            <span v-if="!loading">Submit</span>
            <app-spinner v-else></app-spinner>
        </app-btn>
    </div>
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
