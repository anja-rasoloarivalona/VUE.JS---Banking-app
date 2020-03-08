<template>
    <div class="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.nav {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    width: calc(100vw - 20rem);
    background: $color-secondary;
}
</style>
