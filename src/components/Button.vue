<template>
    <router-link v-if="link" :to="'/' + link">
        <slot></slot>
    </router-link>
    <button v-else @click="clicked" :type="type">
        <slot></slot>
    </button>
</template>

<script>
export default {
  props: {
    link: String,
    clicked: Function,
    type: String
  }
}
</script>

<style lang="scss" scoped>

</style>
