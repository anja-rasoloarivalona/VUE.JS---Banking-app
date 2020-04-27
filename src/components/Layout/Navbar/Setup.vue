<template>
    <div class="setup">
        <div>Setup</div>
        <div class="setup__cta">Logout</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.setup {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & div {
        font-size: $font-m;
        color: $color-primary;
    }
    &__cta {
        cursor: pointer;
        transition: all .2s ease-in;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
