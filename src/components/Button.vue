<template>
    <router-link v-if="link" :to="'/' + link">
        <slot></slot>
    </router-link>
    <button
        @click="click"
        v-else
        :class="{'app-btn': normal, 'primary': primary, 'secondary': secondary}"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
  props: {
    link: String,
    normal: Boolean,
    primary: Boolean,
    secondary: Boolean,
    click: Function
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
    color: $color-white;
    cursor: pointer;
    &.primary{
        background: $color-primary;
    }
    &.secondary{
        background: $color-secondary;
    }
}
</style>
