<template>
    <router-link v-if="link" :to="'/' + link">
        <slot></slot>
    </router-link>
    <button
        v-bind="$attrs"
        v-else
        class="app-btn"
        :class="{'normal': normal, 'small': small, 'primary': primary, 'secondary': secondary, 'warning': warning}"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
  props: {
    link: String,
    normal: Boolean,
    small: Boolean,
    primary: Boolean,
    secondary: Boolean,
    warning: Boolean
  }
}
</script>

<style lang="scss" scoped>
.app-btn {
    height: 3.5rem;
    border: none;
    border-radius: .5rem;
    color: $color-white;
    margin: 1rem;
    cursor: pointer;
    transition: all .3 ease-in;
    &:focus {
    outline: none !important;
    }
}

.normal {
    width: 11rem;
}
.small {
    width: 7rem;
}

.primary{
    background: var(--mainColor);
    &:disabled {
    background: var(--on-surfaceColor);
    color: var(--textColor--dark);
    cursor: not-allowed;
    }
}
.secondary {
    background: var(--secondaryColor)
}
.warning {
    background: var(--warningColor);
}
</style>
