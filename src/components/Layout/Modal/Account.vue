<template>
    <div class="account">
        <div class="account__item">
            <div class="account__item__key">name</div>
            <div class="account__item__value">{{this.$store.state.auth.userName}}</div>
        </div>
        <div class="account__item">
            <div class="account__item__key">email</div>
            <div class="account__item__value">{{this.$store.state.auth.userEmail}}</div>
        </div>
        <div class="account__item">
            <div class="account__item__key">password</div>
            <div class="account__item__value">*******</div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.account {
    &__item {
        display: flex;
        margin-bottom: 1rem;
        padding: 1rem 0;
        &__key {
            width: 10rem;
            color: var(--app-title-color-secondary)
        }
    }
}
</style>
