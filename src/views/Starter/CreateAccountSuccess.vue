<template>
    <div class="success">
        <div class="success__title">Welcome {{this.$store.state.user.name}}!</div>
        <div class="success__board">
            <h2>Congratulations! Your account has been created successfully</h2>
        </div>
        <app-btn normal>
            Get started
        </app-btn>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.success {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__title {
        font-size: 2rem;
        color: $color-grey--dark;
    }
    &__board {
        border: 1px solid $color-primary;
        background: $color-white;
        padding: 2rem;
        color: $color-primary;
        margin: 3rem 0;
        border-radius: .5rem;
    }
}
</style>
