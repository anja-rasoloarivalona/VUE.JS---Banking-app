<template>
    <router-link v-if="link" :to="'/' + link">
        <slot></slot>
    </router-link>
    <button v-else :class="{'app-btn': normal}">
        <slot></slot>
    </button>
</template>

<script>
export default {
  props: {
    link: String,
    normal: Boolean
  }
}
</script>

<style lang="scss" scoped>
button:focus {
    outline: none !important;
}
.app-btn {
    width: 11rem;
    padding: 1rem 0;
    border: none;
    border-radius: .5rem;
}
</style>
